'use client';

import { useEffect, useState } from 'react';

interface LeaderboardEntry {
    user_id: string;
    username: string;
    elo: number;
    wins: number;
    losses: number;
}

const FALLBACK: LeaderboardEntry[] = Array.from({ length: 26 }).map((_, i) => ({
    user_id: `fallback-${i}`,
    username: i === 0 ? 'Awaiting Challengers' : '—',
    elo: i === 0 ? 1200 : 0,
    wins: 0,
    losses: 0,
}));

export default function DualSuitLeaderboard() {
    const [entries, setEntries] = useState<LeaderboardEntry[]>(FALLBACK);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Will be wired to the public leaderboard proxy once deployed
        setLoading(false);
    }, []);

    return (
        <section
            id="leaderboard"
            className="py-24 px-6"
            style={{ background: '#12141A' }}
        >
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-14">
                    <p
                        className="text-xs tracking-widest uppercase text-rose-500 mb-3"
                        style={{ fontFamily: 'var(--font-subhead)' }}
                    >
                        DualSuit Jujitsu
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                        style={{ fontFamily: 'var(--font-headline)' }}
                    >
                        Hall of Champions
                    </h2>
                    <p
                        className="text-rose-500 text-lg font-bold italic"
                        style={{ fontFamily: 'var(--font-subhead)' }}
                    >
                        The masters of the 26-card duel
                    </p>
                </div>

                {/* Table */}
                <div
                    className="rounded-sm overflow-hidden"
                    style={{
                        border: '1px solid rgba(255,255,255,0.07)',
                        background: 'rgba(18, 20, 26, 0.6)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {/* Header */}
                    <div
                        className="grid grid-cols-12 px-6 py-3 text-xs tracking-widest uppercase text-zinc-500 border-b border-white/5"
                        style={{ fontFamily: 'var(--font-subhead)' }}
                    >
                        <span className="col-span-2">Rank</span>
                        <span className="col-span-4">Player</span>
                        <span className="col-span-3 text-center">W / L</span>
                        <span className="col-span-3 text-right">ELO</span>
                    </div>

                    {/* Rows */}
                    {loading
                        ? Array.from({ length: 26 }).map((_, i) => (
                            <div key={i} className="grid grid-cols-12 px-6 py-4 border-b border-white/5 animate-pulse">
                                <div className="col-span-2 h-4 w-6 bg-white/10 rounded" />
                                <div className="col-span-4 h-4 w-28 bg-white/10 rounded" />
                                <div className="col-span-3 h-4 w-16 bg-white/10 rounded mx-auto" />
                                <div className="col-span-3 h-4 w-12 bg-white/10 rounded ml-auto" />
                            </div>
                        ))
                        : entries.slice(0, 26).map((entry, i) => {
                            const rank = i + 1;
                            const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
                            const rankColor = rank === 1 ? '#F59E0B' : rank === 2 ? '#9CA3AF' : rank === 3 ? '#CD7F32' : '#6b7280';

                            return (
                                <div
                                    key={entry.user_id}
                                    className="grid grid-cols-12 items-center px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors duration-200"
                                >
                                    <span
                                        className="col-span-2 text-sm font-bold"
                                        style={{ color: rankColor, fontFamily: 'var(--font-subhead)' }}
                                    >
                                        {medal}
                                    </span>
                                    <span
                                        className="col-span-4 text-sm font-medium text-white"
                                        style={{ fontFamily: 'var(--font-subhead)' }}
                                    >
                                        {entry.username}
                                    </span>
                                    <span className="col-span-3 text-center text-xs text-zinc-500" style={{ fontFamily: 'var(--font-body)' }}>
                                        {entry.wins > 0 || entry.losses > 0 ? (
                                            <>
                                                <span className="text-green-400">{entry.wins}W</span>
                                                {' / '}
                                                <span className="text-rose-500">{entry.losses}L</span>
                                            </>
                                        ) : '—'}
                                    </span>
                                    <span
                                        className="col-span-3 text-right text-sm font-semibold"
                                        style={{
                                            color: entry.elo > 0 ? '#E11D48' : '#374151',
                                            fontFamily: 'var(--font-headline)',
                                        }}
                                    >
                                        {entry.elo > 0 ? entry.elo : '—'}
                                    </span>
                                </div>
                            );
                        })}
                </div>

                <p className="text-center text-xs text-zinc-700 mt-6" style={{ fontFamily: 'var(--font-subhead)' }}>
                    Rankings update after every match · Only true strategists reach the top
                </p>
            </div>
        </section>
    );
}
