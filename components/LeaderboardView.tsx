'use client';

import { useState } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────
export interface LeaderboardEntry {
    user_id: string;
    username: string;
    elo: number;
    wins?: number;
    losses?: number;
}

// ── Static game registry (grows as games launch) ─────────────────────────────
export const GAMES: { id: string; label: string; status: 'live' | 'coming-soon' }[] = [
    { id: 'global', label: 'Global', status: 'live' },
    { id: 'psychological-jujitsu', label: 'Psychological Jujitsu', status: 'coming-soon' },
    { id: 'dualsuit-jujitsu', label: 'DualSuit Jujitsu', status: 'live' },
];

// Rank medal labels and colours for top 3
const RANK_LABELS = ['🥇', '🥈', '🥉'];
const RANK_COLORS = ['#F59E0B', '#9CA3AF', '#CD7F32'];

interface LeaderboardTableProps {
    entries: LeaderboardEntry[];
    showRecord?: boolean;
}

function LeaderboardTable({ entries, showRecord = false }: LeaderboardTableProps) {
    if (entries.length === 0) {
        return (
            <div className="py-20 text-center">
                <p className="text-4xl mb-4">🃏</p>
                <p className="text-zinc-500 text-sm" style={{ fontFamily: 'var(--font-subhead)' }}>
                    No matches recorded yet. Be the first to compete.
                </p>
            </div>
        );
    }

    return (
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
                className={`grid px-6 py-3 text-xs tracking-widest uppercase text-zinc-500 border-b border-white/5 ${showRecord ? 'grid-cols-12' : 'grid-cols-10'}`}
                style={{ fontFamily: 'var(--font-subhead)' }}
            >
                <span className="col-span-1">Rank</span>
                <span className={showRecord ? 'col-span-5' : 'col-span-7'}>Player</span>
                {showRecord && <span className="col-span-2 text-center">W / L</span>}
                <span className="col-span-2 text-right">ELO</span>
            </div>

            {/* Rows */}
            {entries.map((entry, i) => (
                <div
                    key={entry.user_id}
                    className={`grid items-center px-6 py-4 border-b border-white/5 last:border-0 transition-colors duration-200 hover:bg-white/[0.02] ${showRecord ? 'grid-cols-12' : 'grid-cols-10'}`}
                >
                    {/* Rank */}
                    <span
                        className="col-span-1 text-base font-bold"
                        style={{ color: i < 3 ? RANK_COLORS[i] : '#6b7280' }}
                    >
                        {i < 3 ? RANK_LABELS[i] : `#${i + 1}`}
                    </span>

                    {/* Username */}
                    <span
                        className={`${showRecord ? 'col-span-5' : 'col-span-7'} text-sm font-medium text-white`}
                        style={{ fontFamily: 'var(--font-subhead)' }}
                    >
                        {entry.username}
                    </span>

                    {/* W/L */}
                    {showRecord && (
                        <span className="col-span-2 text-center text-xs text-zinc-500" style={{ fontFamily: 'var(--font-body)' }}>
                            <span className="text-green-500">{entry.wins ?? 0}W</span>
                            {' / '}
                            <span className="text-rose-500">{entry.losses ?? 0}L</span>
                        </span>
                    )}

                    {/* ELO */}
                    <span
                        className="col-span-2 text-right text-sm font-semibold"
                        style={{ color: '#E11D48', fontFamily: 'var(--font-headline)' }}
                    >
                        {entry.elo}
                    </span>
                </div>
            ))}
        </div>
    );
}

// ── Main Leaderboard Component ────────────────────────────────────────────────
interface LeaderboardViewProps {
    globalData: LeaderboardEntry[];
    gameData: Record<string, LeaderboardEntry[]>;
}

export default function LeaderboardView({ globalData, gameData }: LeaderboardViewProps) {
    const [activeTab, setActiveTab] = useState('global');

    const activeEntries = activeTab === 'global'
        ? globalData
        : (gameData[activeTab] ?? []);

    const isComingSoon = GAMES.find(g => g.id === activeTab)?.status === 'coming-soon';

    return (
        <div>
            {/* Tab bar */}
            <div
                className="flex gap-1 p-1 mb-8 rounded-sm w-full overflow-x-auto"
                style={{ background: 'rgba(18, 20, 26, 0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
                {GAMES.map(game => (
                    <button
                        key={game.id}
                        onClick={() => setActiveTab(game.id)}
                        className="flex-1 min-w-max px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-sm transition-all duration-200 whitespace-nowrap"
                        style={{
                            fontFamily: 'var(--font-subhead)',
                            background: activeTab === game.id ? '#E11D48' : 'transparent',
                            color: activeTab === game.id ? '#fff' : '#6b7280',
                        }}
                    >
                        {game.label}
                        {game.status === 'coming-soon' && (
                            <span className="ml-1.5 text-[10px] opacity-60">(soon)</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Coming soon overlay */}
            {isComingSoon ? (
                <div className="py-20 text-center">
                    <p className="text-4xl mb-4">🧠</p>
                    <p className="text-white font-bold mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
                        In Development
                    </p>
                    <p className="text-zinc-500 text-sm" style={{ fontFamily: 'var(--font-subhead)' }}>
                        Psychological Jujitsu leaderboard will appear here at launch.
                    </p>
                </div>
            ) : (
                <LeaderboardTable
                    entries={activeEntries}
                    showRecord={activeTab !== 'global'}
                />
            )}

            {/* Footer note */}
            <p className="text-center text-xs text-zinc-700 mt-6" style={{ fontFamily: 'var(--font-subhead)' }}>
                {activeTab === 'global'
                    ? 'Global ELO reflects skill across all PureStrat titles.'
                    : 'Per-game ELO is independent of your global ranking.'}
            </p>
        </div>
    );
}
