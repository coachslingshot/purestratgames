import Link from 'next/link';

export default function Footer() {
    return (
        <footer
            className="py-12 px-6 mt-auto"
            style={{
                background: '#12141A',
                borderTop: '1px solid #1C1E22',
            }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <span
                            className="text-sm font-bold tracking-widest uppercase text-white"
                            style={{ fontFamily: 'var(--font-headline)' }}
                        >
                            PureStrat <span className="text-rose-500">Games</span>
                        </span>
                        <p
                            className="text-xs text-zinc-600 tracking-wider"
                            style={{ fontFamily: 'var(--font-subhead)' }}
                        >
                            0% luck, 100% strategy.
                        </p>
                    </div>

                    {/* Nav links */}
                    <nav
                        className="flex items-center gap-6 text-xs tracking-widest uppercase text-zinc-500"
                        style={{ fontFamily: 'var(--font-subhead)' }}
                    >
                        <Link href="#games" className="hover:text-white transition-colors duration-200">Games</Link>
                        <Link href="#about" className="hover:text-white transition-colors duration-200">About</Link>
                        <Link href="#leaderboard" className="hover:text-white transition-colors duration-200">Rankings</Link>
                    </nav>

                    {/* Copyright */}
                    <p
                        className="text-xs text-zinc-600"
                        style={{ fontFamily: 'var(--font-subhead)' }}
                    >
                        © 2026 PureStrat Games
                    </p>
                </div>

                {/* Divider */}
                <div className="mt-8 pt-6 border-t border-[#1C1E22] text-center">
                    <p
                        className="text-xs text-zinc-700 tracking-widest italic"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Every move reveals the mind.
                    </p>
                </div>
            </div>
        </footer>
    );
}
