'use client';

import Image from 'next/image';

const DUALSUIT_URL = process.env.NEXT_PUBLIC_DUALSUIT_URL ?? 'http://localhost:5173';

export default function QuickPlayStrip() {
    return (
        <div className="flex items-center gap-8 mb-12">
            {/* Psychological Jujitsu — coming soon */}
            <div
                className="flex flex-col items-center gap-2 cursor-default opacity-50"
                title="Psychological Jujitsu — Coming Soon"
            >
                <div
                    className="relative w-20 h-20 rounded-sm overflow-hidden"
                    style={{
                        background: 'rgba(22, 24, 30, 0.7)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    <Image
                        src="/psych-jujitsu-logo.png"
                        alt="Psychological Jujitsu"
                        fill
                        className="object-contain p-2"
                        style={{ filter: 'grayscale(0.6)' }}
                    />
                </div>
                <span
                    className="text-[10px] tracking-widest uppercase text-zinc-600"
                    style={{ fontFamily: 'var(--font-subhead)' }}
                >
                    Soon
                </span>
            </div>

            {/* Vertical divider */}
            <div className="w-px h-16 bg-white/10" aria-hidden="true" />

            {/* DualSuit Jujitsu — live */}
            <a
                href={DUALSUIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
                title="Play DualSuit Jujitsu"
            >
                <div
                    className="relative w-20 h-20 rounded-sm overflow-hidden transition-transform duration-300 group-hover:scale-110"
                    style={{
                        background: 'rgba(22, 24, 30, 0.7)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    {/* Pure-CSS glow on hover via a pseudo-overlay div */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm"
                        style={{ boxShadow: 'inset 0 0 0 1px rgba(225,29,72,0.6), 0 0 20px rgba(225,29,72,0.4)' }}
                    />
                    <Image
                        src="/dualsuit-jujitsu-logo.png"
                        alt="DualSuit Jujitsu"
                        fill
                        className="object-contain p-2"
                    />
                </div>
                <span
                    className="text-[10px] tracking-widest uppercase text-rose-500 group-hover:text-white transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-subhead)' }}
                >
                    Play Now
                </span>
            </a>
        </div>
    );
}
