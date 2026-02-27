import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * GET /api/currency
 * Get current user balance.
 */
export async function GET(_req: NextRequest) {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const adminSupabase = createAdminClient();
    const { data, error } = await adminSupabase
        .from('player_currency')
        .select('balance')
        .eq('user_id', session.user.id)
        .single();

    if (error) return NextResponse.json({ balance: 0 }); // Fallback for new users
    return NextResponse.json(data);
}

/**
 * POST /api/currency/transaction
 * Handle credits/debits (Internal use only)
 */
export async function POST(req: NextRequest) {
    const internalKey = req.headers.get('X-Internal-Key');
    if (internalKey !== process.env.PLATFORM_INTERNAL_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId, amount, type, description } = await req.json();
    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase.rpc('handle_transaction', {
        p_user_id: userId,
        p_amount: amount,
        p_type: type,
        p_description: description
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
}
