interface GameEloEntry {
    game_id: string;
    elo: number;
    wins: number;
    losses: number;
}

interface GameDef {
    id: string;
    label: string;
    motif: string;
    status: 'live' | 'coming-soon';
}

const GAME_DEFS: GameDef[] = [
    { id: 'dualsuit-jujitsu', label: 'DualSuit Jujitsu', motif: '🃏', status: 'live' },
    { id: 'psychological-jujitsu', label: 'Psychological Jujitsu', motif: '🧠', status: 'coming-soon' },
];

interface GameEloGridProps {
    gameElos: GameEloEntry[];
}

export default function GameEloGrid({ gameElos }: GameEloGridProps) {
    const eloMap = new Map(gameElos.map(e => [e.game_id, e]));

    return (
        <div className="mb-8">
            <h2
                className="text-xs tracking-widest uppercase text-rose-500 mb-4"
                style={{ fontFamily: 'var(--font-subhead)' }}
            >
                Per-Game Rankings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {GAME_DEFS.map(game => {
                    const entry = eloMap.get(game.id);
                    const isComingSoon = game.status === 'coming-soon';

                    return (
                        <div
                            key={game.id}
                            className="rounded-sm p-5 flex items-center gap-5"
                            style={{
                                background: 'rgba(18, 20, 26, 0.6)',
                                border: `1px solid ${isComingSoon ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)'}`,
                                backdropFilter: 'blur(10px)',
                                opacity: isComingSoon ? 0.55 : 1,
                            }}
                        >
                            {/* Motif */}
                            <span className="text-4xl shrink-0">{game.motif}</span>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p
                                    className="text-xs tracking-widest uppercase mb-1 truncate"
                                    style={{
                                        fontFamily: 'var(--font-subhead)',
                                        color: isComingSoon ? '#4b5563' : 'rgba(225,29,72,0.7)',
                                    }}
                                >
                                    {isComingSoon ? 'Coming Soon' : 'Game ELO'}
                                </p>
                                <p
                                    className="text-base font-bold text-white leading-tight truncate"
                                    style={{ fontFamily: 'var(--font-headline)' }}
                                >
                                    {game.label}
                                </p>

                                {!isComingSoon && (
                                    <div className="flex items-center gap-4 mt-2">
                                        <span
                                            className="text-lg font-bold"
                                            style={{ color: '#E11D48', fontFamily: 'var(--font-headline)' }}
                                        >
                                            {entry?.elo ?? 1200}
                                        </span>
                                        <span className="text-xs text-zinc-500" style={{ fontFamily: 'var(--font-body)' }}>
                                            <span className="text-green-400">{entry?.wins ?? 0}W</span>
                                            {' / '}
                                            <span className="text-rose-500">{entry?.losses ?? 0}L</span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
