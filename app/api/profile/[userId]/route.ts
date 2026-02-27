import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * GET /api/profile/[userId]
 * Fetches consolidated profile data for a specific user.
 */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    const adminSupabase = createAdminClient();

    // Fetch everything in parallel
    const [profileResult, gameEloResult, friendsResult] = await Promise.allSettled([
        adminSupabase.from('player_profiles').select('*').eq('user_id', userId).single(),
        adminSupabase.from('game_elo').select('*').eq('user_id', userId),
        adminSupabase.from('friends').select('*')
            .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`)
            .eq('status', 'accepted')
    ]);

    if (profileResult.status === 'rejected' || profileResult.value.error) {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const profile = profileResult.value.data;
    const gameElos = gameEloResult.status === 'fulfilled' ? (gameEloResult.value.data || []) : [];
    const friendsRaw = friendsResult.status === 'fulfilled' ? (friendsResult.value.data || []) : [];

    // Resolve friends profiles
    const friends = await Promise.all(friendsRaw.map(async (f) => {
        const friendId = f.user_id_1 === userId ? f.user_id_2 : f.user_id_1;
        const { data: friendProfile } = await adminSupabase
            .from('player_profiles')
            .select('user_id, username, elo')
            .eq('user_id', friendId)
            .single();

        return {
            id: f.id,
            since: f.created_at,
            friend: friendProfile ? {
                user_id: friendProfile.user_id,
                username: friendProfile.username,
                elo: friendProfile.elo
            } : null
        };
    }));

    return NextResponse.json({
        profile,
        gameElos,
        friends,
        sessionUserId: session?.user.id || null,
    });
}

/**
 * PATCH /api/profile/[userId]
 * Updates profile data (username, avatar).
 * Requires authentication and owner verification.
 */
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    // Auth check
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Owner check
    if (session.user.id !== userId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { username, avatar_url } = await req.json();
    const adminSupabase = createAdminClient();

    const { data: updated, error } = await adminSupabase
        .from('player_profiles')
        .update({
            username,
            avatar_url,
            updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(updated);
}
