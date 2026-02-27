'use client';

import { useEffect, useState } from 'react';

interface LeaderboardEntry {
    user_id: string;
    username: string;
    elo: number;
}

// Full 26-player fallback for a premium day-one look
const FALLBACK: LeaderboardEntry[] = Array.from({ length: 26 }).map((_, i) => ({
    user_id: `fallback-${i}`,
    username: i === 0 ? 'Awaiting Players' : '—',
    elo: i === 0 ? 1200 : 0,
}));

export default function LeaderboardStrip() {
    const [entries, setEntries] = useState<LeaderboardEntry[]>(FALLBACK);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch logic placeholder
        setLoading(false);
    }, []);

    return (
        <section
            id="leaderboard"
            className="py-24 px-6"
            style={{ background: 'rgba(12, 13, 17, 0.6)' }}
        >
            <div className="max-w-5xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16">
                    <p
                        className="text-rose-500 text-lg md:text-xl font-bold italic tracking-wide mb-3"
                        style={{ fontFamily: 'var(--font-subhead)' }}
                    >
                        Global Rankings
                    </p>
                    <h2
                        className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-4"
                        style={{ fontFamily: 'var(--font-headline)' }}
                    >
                        The Pure Circle
                    </h2>
                    <p
                        className="text-rose-500 text-lg md:text-xl font-bold italic tracking-wide"
                        style={{ fontFamily: 'var(--font-subhead)' }}
                    >
                        The minds that have mastered pure strategy
                    </p>
                </div>

                {/* Table */}
                <div
                    className="rounded-sm overflow-hidden"
                    style={{
                        border: '1px solid rgba(255,255,255,0.07)',
                        background: 'rgba(18, 20, 26, 0.5)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {/* Header row */}
                    <div
                        className="grid grid-cols-12 px-6 py-3 text-xs tracking-widest uppercase text-zinc-500 border-b border-white/5"
                        style={{ fontFamily: 'var(--font-subhead)' }}
                    >
                        <span className="col-span-2">Rank</span>
                        <span className="col-span-6">Player</span>
                        <span className="col-span-4 text-right">ELO</span>
                    </div>

                    {/* Rows */}
                    {loading
                        ? Array.from({ length: 26 }).map((_, i) => (
                            <div key={i} className="grid grid-cols-12 px-6 py-4 border-b border-white/5 animate-pulse">
                                <div className="col-span-2 h-4 w-4 bg-white/10 rounded" />
                                <div className="col-span-6 h-4 w-32 bg-white/10 rounded" />
                                <div className="col-span-4 h-4 w-12 bg-white/10 rounded ml-auto" />
                            </div>
                        ))
                        : entries.slice(0, 26).map((entry, i) => {
                            const rank = i + 1;
                            const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
                            const rankColor = rank === 1 ? '#F59E0B' : rank === 2 ? '#9CA3AF' : rank === 3 ? '#CD7F32' : '#6b7280';

                            return (
                                <div
                                    key={entry.user_id || i}
                                    className="grid grid-cols-12 items-center px-6 py-4 border-b border-white/5 last:border-0 transition-colors duration-200 hover:bg-white/[0.02]"
                                >
                                    <span
                                        className="col-span-2 text-sm font-bold"
                                        style={{ color: rankColor, fontFamily: 'var(--font-subhead)' }}
                                    >
                                        {medal}
                                    </span>
                                    <span
                                        className="col-span-6 text-sm font-medium text-white"
                                        style={{ fontFamily: 'var(--font-subhead)' }}
                                    >
                                        {entry.username}
                                    </span>
                                    <span
                                        className="col-span-4 text-right text-sm font-semibold"
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

                {/* Footer note */}
                <p className="text-center text-xs text-zinc-600 mt-6" style={{ fontFamily: 'var(--font-subhead)' }}>
                    Rankings update after every match · Earn your position through pure strategy
                </p>
            </div>
        </section>
    );
}
