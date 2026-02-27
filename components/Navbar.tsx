'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import AuthButton from '@/components/AuthButton';

interface NavUser {
    userId: string;
    username: string;
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<NavUser | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Fetch Supabase session and player username
    useEffect(() => {
        const supabase = createClient();

        async function loadUser() {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            // Fetch username from platform-api proxy
            try {
                const res = await fetch(`/api/profile/${session.user.id}`);
                if (res.ok) {
                    const { profile } = await res.json();
                    if (profile?.username) {
                        setUser({ userId: session.user.id, username: profile.username });
                    }
                }
            } catch {
                // Session exists but profile fetch failed — still show a fallback
                setUser({ userId: session.user.id, username: session.user.email?.split('@')[0] ?? 'Player' });
            }
        }

        loadUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) setUser(null);
            else loadUser();
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                background: scrolled ? 'rgba(18, 20, 26, 0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
        >
            <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span
                        className="text-sm font-bold tracking-widest uppercase text-white group-hover:text-rose-400 transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-headline)' }}
                    >
                        PureStrat
                    </span>
                    <span
                        className="text-sm font-bold tracking-widest uppercase text-rose-500"
                        style={{ fontFamily: 'var(--font-headline)' }}
                    >
                        Games
                    </span>
                </Link>

                {/* Nav Links */}
                <div
                    className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase text-zinc-400"
                    style={{ fontFamily: 'var(--font-subhead)' }}
                >
                    <Link href="/#games" className="hover:text-white transition-colors duration-200">Games</Link>
                    <Link href="/#about" className="hover:text-white transition-colors duration-200">About</Link>
                    <Link href="/leaderboard" className="hover:text-white transition-colors duration-200">Rankings</Link>
                </div>

                {/* Right side — session user or empty */}
                <div className="w-32 flex justify-end">
                    {user ? (
                        <Link
                            href={`/profile/${user.userId}`}
                            className="flex items-center gap-2 group"
                            title="View your profile"
                        >
                            {/* Avatar circle */}
                            <div
                                className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-black shrink-0 group-hover:border-rose-500 transition-colors duration-200"
                                style={{
                                    background: 'rgba(225,29,72,0.15)',
                                    border: '1px solid rgba(225,29,72,0.3)',
                                    color: '#E11D48',
                                    fontFamily: 'var(--font-headline)',
                                }}
                            >
                                {user.username.slice(0, 2).toUpperCase()}
                            </div>
                            <span
                                className="text-xs font-semibold tracking-wider text-zinc-300 group-hover:text-white transition-colors duration-200 max-w-[80px] truncate"
                                style={{ fontFamily: 'var(--font-subhead)' }}
                            >
                                {user.username}
                            </span>
                        </Link>
                    ) : (
                        <AuthButton />
                    )}
                </div>
            </nav>
        </header>
    );
}
