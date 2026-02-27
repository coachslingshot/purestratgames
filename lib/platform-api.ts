const PLATFORM_API_URL = process.env.PLATFORM_API_URL || 'http://localhost:4000';

export async function fetchPlatform(path: string, options: RequestInit = {}) {
    const res = await fetch(`${PLATFORM_API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `Platform API error: ${res.status}`);
    }

    return res.json();
}

export const platformApi = {
    getProfile: (userId: string, token: string) =>
        fetchPlatform(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),

    updateProfile: (userId: string, token: string, data: { username?: string; avatar_url?: string }) =>
        fetchPlatform(`/users/${userId}`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify(data),
        }),

    getFriends: (userId: string, token: string) =>
        fetchPlatform(`/users/${userId}/friends`, {
            headers: { Authorization: `Bearer ${token}` }
        }),

    getCurrency: (userId: string, token: string) =>
        fetchPlatform(`/users/${userId}/currency`, {
            headers: { Authorization: `Bearer ${token}` }
        }),

    getLeaderboard: (token: string, gameId?: string) =>
        fetchPlatform(gameId ? `/leaderboard/${gameId}` : '/leaderboard', {
            headers: { Authorization: `Bearer ${token}` }
        }),
};
