import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * GET /api/friends
 * Lists accepted friends for the current user.
 */
export async function GET(_req: NextRequest) {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminSupabase = createAdminClient();
    const { data: friends, error } = await adminSupabase
        .from('friends')
        .select(`
      id,
      user_id_1,
      user_id_2,
      status,
      since:created_at
    `)
        .or(`user_id_1.eq.${session.user.id},user_id_2.eq.${session.user.id}`)
        .eq('status', 'accepted');

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // Resolve friend profile details
    const friendList = await Promise.all(friends.map(async (f) => {
        const friendId = f.user_id_1 === session.user.id ? f.user_id_2 : f.user_id_1;
        const { data: profile } = await adminSupabase
            .from('player_profiles')
            .select('user_id, username, elo')
            .eq('user_id', friendId)
            .single();

        return {
            id: f.id,
            since: f.since,
            friend: profile ? {
                user_id: profile.user_id,
                username: profile.username,
                elo: profile.elo
            } : null
        };
    }));

    return NextResponse.json(friendList);
}

/**
 * POST /api/friends
 * Sends a friend request.
 */
export async function POST(req: NextRequest) {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { friendId } = await req.json();
    if (session.user.id === friendId) {
        return NextResponse.json({ error: 'Cannot friend yourself' }, { status: 400 });
    }

    const adminSupabase = createAdminClient();
    const { data, error } = await adminSupabase
        .from('friends')
        .insert({
            user_id_1: session.user.id,
            user_id_2: friendId,
            status: 'pending'
        })
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
}
