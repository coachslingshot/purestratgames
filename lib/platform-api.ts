/**
 * Platform API client for the PureStrat Portal.
 * These methods call the local /api routes which now handle the 
 * direct interaction with Supabase.
 */

export const platformApi = {
    /**
     * Fetches the consolidated profile payload for a user.
     */
    async getProfile(userId: string) {
        const res = await fetch(`/api/profile/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
    },

    /**
     * Updates the current user's profile.
     */
    async updateProfile(userId: string, data: { username?: string; avatar_url?: string }) {
        const res = await fetch(`/api/profile/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
    },

    /**
     * Fetches leaderboard data.
     * If gameId is omitted, returns the global leaderboard.
     */
    async getLeaderboard(gameId?: string) {
        const url = gameId ? `/api/leaderboard?gameId=${gameId}` : '/api/leaderboard';
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        return res.json();
    },

    /**
     * Fetches the current user's rival list.
     */
    async getFriends() {
        const res = await fetch('/api/friends');
        if (!res.ok) throw new Error('Failed to fetch friends');
        return res.json();
    },

    /**
     * Fetches the current user's currency balance.
     */
    async getBalance() {
        const res = await fetch('/api/currency');
        if (!res.ok) throw new Error('Failed to fetch balance');
        const data = await res.json();
        return data.balance || 0;
    }
};
