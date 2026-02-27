import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DualSuitLeaderboard from '@/components/DualSuitLeaderboard';

const GAME_URL = process.env.NEXT_PUBLIC_DUALSUIT_URL ?? 'http://localhost:5173';

const HOW_TO_PLAY = [
    {
        step: '01',
        title: 'Know Your Hand',
        body: 'Each player holds 26 cards split across two suits. Every card has hidden strategic weight — recognise the patterns before your opponent does.',
    },
    {
        step: '02',
        title: 'Read and Anticipate',
        body: 'There is no randomness. Every move your opponent makes is a signal. Track what has been played and predict what is coming.',
    },
    {
        step: '03',
        title: 'Control the Tempo',
        body: 'Aggression and defense are the same weapon wielded at different moments. Knowing when to strike vs. when to hold is the entire game.',
    },
    {
        step: '04',
        title: 'Outmaneuver to Win',
        body: 'Force your opponent into a position from which no move survives. Victory is total — there are no lucky breaks, only superior decisions.',
    },
];

export const metadata = {
    title: 'DualSuit Jujitsu | PureStrat Games',
    description: 'A deterministic 26-card strategic combat game for 2–5 players. No luck. Pure pattern recognition and anticipation.',
};

export default function DualSuitPage() {
    return (
        <main className="min-h-screen flex flex-col" style={{ color: '#F4F4F5' }}>
            <Navbar />

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section
                className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-20"
                style={{ minHeight: '85vh', background: '#0B0C10' }}
            >
                {/* Radial background glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at center top, rgba(225,29,72,0.1) 0%, transparent 60%)' }}
                    aria-hidden="true"
                />

                {/* Logo */}
                <div className="relative w-48 h-48 mb-8 drop-shadow-2xl">
                    <Image
                        src="/dualsuit-jujitsu-logo.png"
                        alt="DualSuit Jujitsu"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Title */}
                <h1
                    className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4 leading-none"
                    style={{ fontFamily: 'var(--font-headline)' }}
                >
                    DualSuit<br /><span style={{ color: '#E11D48' }}>Jujitsu</span>
                </h1>

                {/* Subtitle */}
                <p
                    className="text-sm md:text-base tracking-widest uppercase font-semibold mb-2"
                    style={{ fontFamily: 'var(--font-subhead)', color: 'rgba(225,29,72,0.7)' }}
                >
                    Heightened 26 Card Combat
                </p>
                <p
                    className="text-zinc-500 text-sm tracking-wide mb-10"
                    style={{ fontFamily: 'var(--font-subhead)' }}
                >
                    For 2 to 5 Players · 0% Luck · 100% Strategy
                </p>

                {/* CTA */}
                <a
                    href={GAME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                    style={{
                        background: '#E11D48',
                        color: '#fff',
                        fontFamily: 'var(--font-subhead)',
                        boxShadow: '0 0 40px rgba(225,29,72,0.35)',
                        borderRadius: '2px',
                    }}
                >
                    ⚔ Enter the Duel
                </a>

                {/* Bottom gradient fade */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, transparent, #12141A)' }}
                    aria-hidden="true"
                />
            </section>

            {/* ── About ────────────────────────────────────────────────────── */}
            <section
                className="py-24 px-6"
                style={{ background: '#12141A' }}
            >
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <p
                            className="text-xs tracking-widest uppercase text-rose-500 mb-4"
                            style={{ fontFamily: 'var(--font-subhead)' }}
                        >
                            The Game
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-headline)' }}
                        >
                            A Duel of Heightened Strategy
                        </h2>
                        <p
                            className="text-zinc-400 leading-relaxed text-base mb-4"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            DualSuit Jujitsu is a 26-card strategic combat game where every possible outcome is determined by player decisions alone. The deck is fixed. The rules are absolute. The winner is decided entirely by thinking.
                        </p>
                        <p
                            className="text-zinc-400 leading-relaxed text-base"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            In the tradition of jujitsu — using your opponent's force against them — the game rewards players who read patterns, anticipate responses, and execute with precision. The higher the competition, the more the psychological layer dominates.
                        </p>
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: '26', label: 'Cards in Play' },
                            { value: '2–5', label: 'Players' },
                            { value: '0%', label: 'Luck Factor' },
                            { value: '∞', label: 'Strategic Depth' },
                        ].map(({ value, label }) => (
                            <div
                                key={label}
                                className="rounded-sm p-6 text-center"
                                style={{
                                    background: 'rgba(18, 20, 26, 0.7)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                }}
                            >
                                <p
                                    className="text-3xl font-black text-rose-500 mb-1"
                                    style={{ fontFamily: 'var(--font-headline)' }}
                                >
                                    {value}
                                </p>
                                <p
                                    className="text-xs tracking-widest uppercase text-zinc-500"
                                    style={{ fontFamily: 'var(--font-subhead)' }}
                                >
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How to Play ──────────────────────────────────────────────── */}
            <section
                className="py-24 px-6"
                style={{ background: '#0E1016' }}
            >
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <p
                            className="text-xs tracking-widest uppercase text-rose-500 mb-3"
                            style={{ fontFamily: 'var(--font-subhead)' }}
                        >
                            Fundamentals
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold text-white"
                            style={{ fontFamily: 'var(--font-headline)' }}
                        >
                            How to Play
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {HOW_TO_PLAY.map(({ step, title, body }) => (
                            <div
                                key={step}
                                className="rounded-sm p-6 flex gap-5"
                                style={{
                                    background: 'rgba(18, 20, 26, 0.6)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                }}
                            >
                                <span
                                    className="text-2xl font-black shrink-0 leading-none mt-0.5"
                                    style={{ color: 'rgba(225,29,72,0.35)', fontFamily: 'var(--font-headline)' }}
                                >
                                    {step}
                                </span>
                                <div>
                                    <h3
                                        className="text-base font-bold text-white mb-2"
                                        style={{ fontFamily: 'var(--font-headline)' }}
                                    >
                                        {title}
                                    </h3>
                                    <p
                                        className="text-sm text-zinc-400 leading-relaxed"
                                        style={{ fontFamily: 'var(--font-body)' }}
                                    >
                                        {body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-12">
                        <a
                            href={GAME_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-6 py-3 transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(225,29,72,0.4)',
                                color: '#E11D48',
                                fontFamily: 'var(--font-subhead)',
                                borderRadius: '2px',
                            }}
                        >
                            ⚔ Play Now — It's Free
                        </a>
                    </div>
                </div>
            </section>

            {/* ── DualSuit Leaderboard ─────────────────────────────────────── */}
            <DualSuitLeaderboard />

            <Footer />
        </main>
    );
}
