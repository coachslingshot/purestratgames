import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * GET /api/leaderboard
 * GET /api/leaderboard?gameId=dualsuit-jujitsu
 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const gameId = searchParams.get('gameId');
    const supabase = createAdminClient();

    if (gameId) {
        // Per-game ELO
        const { data: entries, error } = await supabase
            .from('game_elo')
            .select(`
        user_id,
        elo,
        wins,
        losses,
        player_profiles ( username )
      `)
            .eq('game_id', gameId)
            .order('elo', { ascending: false })
            .limit(50);

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });

        // Flatten data for the frontend
        const flatEntries = entries.map((e: any) => ({
            user_id: e.user_id,
            username: e.player_profiles?.username || 'Unknown',
            elo: e.elo,
            wins: e.wins,
            losses: e.losses
        }));

        return NextResponse.json(flatEntries);
    } else {
        // Global Leaderboard
        const { data: entries, error } = await supabase
            .from('player_profiles')
            .select('user_id, username, elo, wins, losses')
            .order('elo', { ascending: false })
            .limit(50);

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json(entries);
    }
}

/**
 * POST /api/leaderboard
 * Submit a match result (Internal use only)
 */
export async function POST(req: NextRequest) {
    const internalKey = req.headers.get('X-Internal-Key');
    if (internalKey !== process.env.PLATFORM_INTERNAL_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, winnerId, results } = await req.json();

    console.log(`[API] Match submission received for ${gameId}. Winner: ${winnerId}`);

    // Since the game server already updates Supabase, we just acknowledge receipt.
    // In a future update, we could move ELO calculation logic here for better security.
    return NextResponse.json({
        status: 'success',
        message: 'Match results recorded',
        gameId,
        participantCount: results?.length || 0
    });
}
