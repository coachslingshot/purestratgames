'use client';

import { useState } from 'react';

interface ProfileHeroProps {
    username: string;
    globalElo: number;
    wins: number;
    losses: number;
    avatarUrl?: string;
    isOwnProfile: boolean;
    onUsernameUpdate?: (newUsername: string) => Promise<void>;
}

function getRankBadge(elo: number): { label: string; color: string } {
    if (elo >= 1800) return { label: 'Grandmaster', color: '#F59E0B' };
    if (elo >= 1600) return { label: 'Master', color: '#C084FC' };
    if (elo >= 1400) return { label: 'Expert', color: '#60A5FA' };
    if (elo >= 1200) return { label: 'Strategist', color: '#34D399' };
    return { label: 'Initiate', color: '#9CA3AF' };
}

export default function ProfileHero({
    username,
    globalElo,
    wins,
    losses,
    avatarUrl,
    isOwnProfile,
    onUsernameUpdate,
}: ProfileHeroProps) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(username);
    const [saving, setSaving] = useState(false);

    const rank = getRankBadge(globalElo);
    const totalGames = wins + losses;
    const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
    const initials = username.slice(0, 2).toUpperCase();

    async function handleSave() {
        if (!onUsernameUpdate || draft.trim() === username) { setEditing(false); return; }
        setSaving(true);
        try {
            await onUsernameUpdate(draft.trim());
        } finally {
            setSaving(false);
            setEditing(false);
        }
    }

    return (
        <div
            className="rounded-sm p-8 mb-8"
            style={{
                background: 'rgba(18, 20, 26, 0.7)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
            }}
        >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Avatar */}
                <div
                    className="shrink-0 w-24 h-24 rounded-sm flex items-center justify-center text-2xl font-black overflow-hidden"
                    style={{
                        background: avatarUrl ? 'none' : 'rgba(225,29,72,0.15)',
                        border: '2px solid rgba(225,29,72,0.3)',
                        fontFamily: 'var(--font-headline)',
                        color: '#E11D48',
                    }}
                >
                    {avatarUrl
                        ? <img src={avatarUrl} alt={username} className="w-full h-full object-cover" />
                        : initials}
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                    {/* Username row */}
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                        {editing ? (
                            <>
                                <input
                                    className="text-2xl font-bold bg-transparent border-b border-rose-500 outline-none text-white"
                                    style={{ fontFamily: 'var(--font-headline)', width: '200px' }}
                                    value={draft}
                                    onChange={e => setDraft(e.target.value)}
                                    autoFocus
                                    onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setEditing(false); }}
                                />
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="text-xs px-3 py-1 rounded-sm font-semibold tracking-widest uppercase transition-colors duration-200"
                                    style={{ background: '#E11D48', color: '#fff', fontFamily: 'var(--font-subhead)' }}
                                >
                                    {saving ? '…' : 'Save'}
                                </button>
                                <button
                                    onClick={() => setEditing(false)}
                                    className="text-xs text-zinc-500 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h1
                                    className="text-3xl font-bold text-white"
                                    style={{ fontFamily: 'var(--font-headline)' }}
                                >
                                    {username}
                                </h1>
                                {isOwnProfile && (
                                    <button
                                        onClick={() => { setDraft(username); setEditing(true); }}
                                        className="text-zinc-600 hover:text-rose-500 transition-colors duration-200 text-sm"
                                        title="Edit username"
                                    >
                                        ✏️
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    {/* Rank badge */}
                    <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-bold tracking-widest uppercase mb-4"
                        style={{
                            background: `${rank.color}18`,
                            border: `1px solid ${rank.color}44`,
                            color: rank.color,
                            fontFamily: 'var(--font-subhead)',
                        }}
                    >
                        {rank.label}
                    </span>

                    {/* Stats row */}
                    <div className="flex items-center gap-8 justify-center md:justify-start">
                        <div className="text-center">
                            <p
                                className="text-2xl font-bold"
                                style={{ color: '#E11D48', fontFamily: 'var(--font-headline)' }}
                            >
                                {globalElo}
                            </p>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest" style={{ fontFamily: 'var(--font-subhead)' }}>
                                Global ELO
                            </p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-400" style={{ fontFamily: 'var(--font-headline)' }}>
                                {wins}
                            </p>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest" style={{ fontFamily: 'var(--font-subhead)' }}>Wins</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-rose-500" style={{ fontFamily: 'var(--font-headline)' }}>
                                {losses}
                            </p>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest" style={{ fontFamily: 'var(--font-subhead)' }}>Losses</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                                {winRate}%
                            </p>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest" style={{ fontFamily: 'var(--font-subhead)' }}>Win Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
