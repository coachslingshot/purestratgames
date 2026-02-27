import Image from 'next/image';

interface GameCardProps {
    title: string;
    subtitle: string;
    description: string;
    status: 'live' | 'coming-soon';
    href?: string;
    motif: string;        // emoji fallback
    imageSrc?: string;    // optional custom logo image (overrides motif)
}

export default function GameCard({ title, subtitle, description, status, href, motif, imageSrc }: GameCardProps) {
    const isLive = status === 'live';

    const CardContent = () => (
        <div
            className="group relative h-full rounded-sm overflow-hidden transition-all duration-500 cursor-pointer"
            style={{
                background: 'rgba(22, 24, 30, 0.7)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                aspectRatio: '5/7',
            }}
        >
            {/* Hover border glow */}
            <div
                className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(225, 29, 72, 0.4)' }}
            />

            {/* Art area */}
            <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{ height: '55%', background: 'rgba(12, 12, 16, 0.6)' }}
            >
                {/* Radial glow */}
                <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                    style={{
                        background: isLive
                            ? 'radial-gradient(circle at center, #E11D48 0%, transparent 65%)'
                            : 'radial-gradient(circle at center, #3f3f50 0%, transparent 65%)',
                    }}
                />

                {/* Custom image or emoji fallback */}
                {imageSrc ? (
                    <div
                        className="relative w-full h-full group-hover:scale-105 transition-transform duration-700"
                        style={{ filter: isLive ? 'none' : 'grayscale(0.7) opacity(0.5)' }}
                    >
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                ) : (
                    <span
                        className="text-9xl select-none group-hover:scale-110 transition-transform duration-700"
                        style={{ filter: isLive ? 'none' : 'grayscale(0.6) opacity(0.5)' }}
                    >
                        {motif}
                    </span>
                )}

                {/* Status badge */}
                <span
                    className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-0.5 rounded-sm tracking-widest uppercase"
                    style={{
                        fontFamily: 'var(--font-subhead)',
                        background: isLive ? 'rgba(225, 29, 72, 0.15)' : 'rgba(255,255,255,0.06)',
                        border: `1px solid ${isLive ? 'rgba(225,29,72,0.35)' : 'rgba(255,255,255,0.12)'}`,
                        color: isLive ? '#E11D48' : '#6b7280',
                    }}
                >
                    {isLive ? 'Live' : 'Coming Soon'}
                </span>
            </div>

            {/* Text area */}
            <div className="p-6 flex flex-col gap-2">
                <p
                    className="text-xs tracking-widest uppercase text-rose-500/70"
                    style={{ fontFamily: 'var(--font-subhead)' }}
                >
                    {subtitle}
                </p>
                <h3
                    className="text-lg font-bold text-white leading-tight"
                    style={{ fontFamily: 'var(--font-headline)' }}
                >
                    {title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mt-1">{description}</p>

                {/* CTA line */}
                <div className="mt-auto pt-4">
                    <span
                        className="text-xs tracking-widest uppercase font-semibold transition-colors duration-200"
                        style={{
                            fontFamily: 'var(--font-subhead)',
                            color: isLive ? '#E11D48' : '#4b5563',
                        }}
                    >
                        {isLive ? 'Enter the duel →' : 'In development'}
                    </span>
                </div>
            </div>
        </div>
    );

    if (isLive && href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
                <CardContent />
            </a>
        );
    }

    return <CardContent />;
}
