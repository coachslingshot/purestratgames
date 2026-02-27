import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { platformApi } from '@/lib/platform-api';

// ── GET /api/profile/[userId] ──────────────────────────────────────────────
// Proxies to the platform-api using the current user's Supabase JWT.
// Returns merged payload: profile + gameElos + friends.
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const token = session.access_token;

    try {
        // Fetch profile, game ELOs for each game, and friends in parallel
        const [profile, dualsuitElo, friends] = await Promise.allSettled([
            platformApi.getProfile(userId, token),
            platformApi.getLeaderboard(token, 'dualsuit-jujitsu')
                .then((rows: Array<{ user_id: string; elo: number; wins: number; losses: number }>) =>
                    rows.find((r) => r.user_id === userId) ?? null
                ),
            platformApi.getFriends(userId, token),
        ]);

        return NextResponse.json({
            profile: profile.status === 'fulfilled' ? profile.value : null,
            gameElos: [
                ...(dualsuitElo.status === 'fulfilled' && dualsuitElo.value
                    ? [{ game_id: 'dualsuit-jujitsu', ...dualsuitElo.value }]
                    : []),
            ],
            friends: friends.status === 'fulfilled' ? friends.value : [],
            sessionUserId: session.user.id,
        });
    } catch (err) {
        console.error('[api/profile]', err);
        return NextResponse.json({ error: 'Failed to load profile' }, { status: 500 });
    }
}

// ── PATCH /api/profile/[userId] ────────────────────────────────────────────
// Update own profile (username only from UI).
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || session.user.id !== userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const updated = await platformApi.updateProfile(userId, session.access_token, body);
    return NextResponse.json(updated);
}
