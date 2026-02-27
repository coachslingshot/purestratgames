'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AuthButton() {
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSignIn() {
        if (!email.trim()) return;
        setLoading(true);
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOtp({
            email: email.trim(),
            options: { emailRedirectTo: `${window.location.origin}/` },
        });
        setLoading(false);
        if (!error) setSent(true);
    }

    return (
        <>
            {/* Trigger */}
            <button
                onClick={() => setOpen(true)}
                className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-sm transition-all duration-200"
                style={{
                    fontFamily: 'var(--font-subhead)',
                    background: 'rgba(225,29,72,0.12)',
                    border: '1px solid rgba(225,29,72,0.3)',
                    color: '#E11D48',
                }}
            >
                Sign In
            </button>

            {/* Modal overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                    style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
                    onClick={e => { if (e.target === e.currentTarget) { setOpen(false); setSent(false); } }}
                >
                    <div
                        className="w-full max-w-sm rounded-sm p-8 relative"
                        style={{
                            background: '#12141A',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                        }}
                    >
                        <button
                            onClick={() => { setOpen(false); setSent(false); }}
                            className="absolute top-4 right-4 text-zinc-600 hover:text-white text-lg leading-none"
                        >×</button>

                        {sent ? (
                            <div className="text-center">
                                <p className="text-3xl mb-4">📬</p>
                                <h2
                                    className="text-lg font-bold text-white mb-2"
                                    style={{ fontFamily: 'var(--font-headline)' }}
                                >
                                    Check your inbox
                                </h2>
                                <p className="text-zinc-400 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                                    We sent a magic link to <span className="text-white">{email}</span>.
                                    Click it to sign in instantly — no password needed.
                                </p>
                            </div>
                        ) : (
                            <>
                                <p
                                    className="text-xs tracking-widest uppercase text-rose-500 mb-3"
                                    style={{ fontFamily: 'var(--font-subhead)' }}
                                >
                                    Enter the Arena
                                </p>
                                <h2
                                    className="text-xl font-bold text-white mb-1"
                                    style={{ fontFamily: 'var(--font-headline)' }}
                                >
                                    Sign In
                                </h2>
                                <p className="text-zinc-500 text-xs mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                                    We'll send a magic link to your email — no password required.
                                </p>

                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSignIn()}
                                    className="w-full px-4 py-3 text-sm text-white outline-none rounded-sm mb-4"
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        fontFamily: 'var(--font-body)',
                                    }}
                                    autoFocus
                                />

                                <button
                                    onClick={handleSignIn}
                                    disabled={loading || !email.trim()}
                                    className="w-full py-3 text-sm font-bold tracking-widest uppercase rounded-sm transition-all duration-200 disabled:opacity-40"
                                    style={{
                                        background: '#E11D48',
                                        color: '#fff',
                                        fontFamily: 'var(--font-subhead)',
                                    }}
                                >
                                    {loading ? 'Sending…' : 'Send Magic Link'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
