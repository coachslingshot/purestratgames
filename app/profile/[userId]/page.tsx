'use client';

import { useEffect, useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileHero from '@/components/ProfileHero';
import GameEloGrid from '@/components/GameEloGrid';
import FriendsList from '@/components/FriendsList';

interface ProfileData {
    profile: {
        user_id: string;
        username: string;
        elo: number;
        wins: number;
        losses: number;
        games_played: number;
        avatar_url?: string;
    } | null;
    gameElos: Array<{ game_id: string; elo: number; wins: number; losses: number }>;
    friends: Array<{ id: string; since: string; friend: { user_id: string; username: string; elo: number } | null }>;
    sessionUserId: string | null;
}

export default function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
    const [userId, setUserId] = useState<string | null>(null);
    const [data, setData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    // Resolve params (Next 15 async params)
    useEffect(() => {
        params.then(p => setUserId(p.userId));
    }, [params]);

    const loadProfile = useCallback(async (uid: string) => {
        try {
            const res = await fetch(`/api/profile/${uid}`);
            if (res.status === 404 || res.status === 401) { setNotFound(true); return; }
            const json: ProfileData = await res.json();
            if (!json.profile) { setNotFound(true); return; }
            setData(json);
        } catch {
            setNotFound(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (userId) loadProfile(userId);
    }, [userId, loadProfile]);

    async function handleUsernameUpdate(newUsername: string) {
        if (!userId) return;
        const res = await fetch(`/api/profile/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: newUsername }),
        });
        if (res.ok) {
            const updated = await res.json();
            setData(prev => prev ? {
                ...prev,
                profile: prev.profile ? { ...prev.profile, username: updated.username } : null
            } : null);
        }
    }

    return (
        <main className="min-h-screen flex flex-col" style={{ color: '#F4F4F5' }}>
            <Navbar />
            <section className="flex-1 max-w-3xl mx-auto w-full px-6 pt-28 pb-24">

                {/* Loading skeleton */}
                {loading && (
                    <div className="animate-pulse space-y-4">
                        <div className="h-40 rounded-sm bg-white/5" />
                        <div className="h-28 rounded-sm bg-white/5" />
                        <div className="h-40 rounded-sm bg-white/5" />
                    </div>
                )}

                {/* Not found */}
                {!loading && notFound && (
                    <div className="text-center py-32">
                        <p className="text-5xl mb-4">🃏</p>
                        <h1
                            className="text-2xl font-bold text-white mb-2"
                            style={{ fontFamily: 'var(--font-headline)' }}
                        >
                            Player Not Found
                        </h1>
                        <p className="text-zinc-500 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                            This profile doesn't exist or isn't accessible.
                        </p>
                    </div>
                )}

                {/* Profile loaded */}
                {!loading && !notFound && data?.profile && (
                    <>
                        <ProfileHero
                            username={data.profile.username}
                            globalElo={data.profile.elo}
                            wins={data.profile.wins}
                            losses={data.profile.losses}
                            avatarUrl={data.profile.avatar_url}
                            isOwnProfile={data.sessionUserId === data.profile.user_id}
                            onUsernameUpdate={handleUsernameUpdate}
                        />
                        <GameEloGrid gameElos={data.gameElos} />
                        <FriendsList friends={data.friends} />
                    </>
                )}
            </section>
            <Footer />
        </main>
    );
}
