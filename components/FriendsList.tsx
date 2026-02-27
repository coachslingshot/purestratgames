import Link from 'next/link';

interface Friend {
    id: string;
    since: string;
    friend: {
        user_id: string;
        username: string;
        elo: number;
    } | null;
}

interface FriendsListProps {
    friends: Friend[];
}

export default function FriendsList({ friends }: FriendsListProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2
                    className="text-xs tracking-widest uppercase text-rose-500"
                    style={{ fontFamily: 'var(--font-subhead)' }}
                >
                    Friends
                </h2>
                <span
                    className="text-xs text-zinc-600"
                    style={{ fontFamily: 'var(--font-subhead)' }}
                >
                    {friends.length} {friends.length === 1 ? 'rival' : 'rivals'}
                </span>
            </div>

            {friends.length === 0 ? (
                <div
                    className="rounded-sm p-8 text-center"
                    style={{
                        background: 'rgba(18, 20, 26, 0.4)',
                        border: '1px solid rgba(255,255,255,0.05)',
                    }}
                >
                    <p className="text-zinc-600 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                        No rivals yet. Challenge your first opponent to get started.
                    </p>
                </div>
            ) : (
                <div
                    className="rounded-sm overflow-hidden"
                    style={{
                        border: '1px solid rgba(255,255,255,0.07)',
                        background: 'rgba(18, 20, 26, 0.5)',
                    }}
                >
                    {friends.map((item, i) => {
                        const f = item.friend;
                        if (!f) return null;
                        const initials = f.username.slice(0, 2).toUpperCase();

                        return (
                            <Link
                                key={item.id}
                                href={`/profile/${f.user_id}`}
                                className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors duration-200 group"
                            >
                                {/* Avatar initials */}
                                <div
                                    className="shrink-0 w-9 h-9 rounded-sm flex items-center justify-center text-sm font-black"
                                    style={{
                                        background: 'rgba(225,29,72,0.12)',
                                        border: '1px solid rgba(225,29,72,0.25)',
                                        color: '#E11D48',
                                        fontFamily: 'var(--font-headline)',
                                    }}
                                >
                                    {initials}
                                </div>

                                {/* Name */}
                                <div className="flex-1 min-w-0">
                                    <p
                                        className="text-sm font-semibold text-white truncate group-hover:text-rose-400 transition-colors duration-200"
                                        style={{ fontFamily: 'var(--font-subhead)' }}
                                    >
                                        {f.username}
                                    </p>
                                    <p className="text-xs text-zinc-600" style={{ fontFamily: 'var(--font-body)' }}>
                                        Rivals since {new Date(item.since).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </p>
                                </div>

                                {/* ELO */}
                                <span
                                    className="text-sm font-bold shrink-0"
                                    style={{ color: '#E11D48', fontFamily: 'var(--font-headline)' }}
                                >
                                    {f.elo}
                                </span>

                                {/* Arrow */}
                                <span className="text-zinc-700 group-hover:text-zinc-400 transition-colors duration-200 text-xs">→</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
