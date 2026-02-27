import LeaderboardView from '@/components/LeaderboardView';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Placeholder data — replace with real platform-api calls once deployed
// Both arrays are empty so the "no matches yet" state shows gracefully
const globalData: [] = [];
const gameData: Record<string, []> = {
    'dualsuit-jujitsu': [],
    'psychological-jujitsu': [],
};

export const metadata = {
    title: 'Rankings | PureStrat Games',
    description: 'Global and per-game ELO leaderboards for all PureStrat titles.',
};

export default function LeaderboardPage() {
    return (
        <main className="min-h-screen flex flex-col" style={{ color: '#F4F4F5' }}>
            <Navbar />

            <section className="flex-1 max-w-5xl mx-auto w-full px-6 pt-32 pb-24">
                {/* Page header */}
                <div className="text-center mb-14">
                    <p
                        className="text-xs tracking-widest uppercase text-rose-500 mb-3"
                        style={{ fontFamily: 'var(--font-subhead)' }}
                    >
                        Rankings
                    </p>
                    <h1
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                        style={{ fontFamily: 'var(--font-headline)' }}
                    >
                        The Pure Circle
                    </h1>
                    <p className="text-zinc-400 text-sm max-w-md mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
                        Compete across all PureStrat titles. Your global ELO reflects total
                        mastery — each game also maintains its own independent ranking.
                    </p>
                </div>

                {/* Tabbed leaderboard */}
                <LeaderboardView globalData={globalData} gameData={gameData} />
            </section>

            <Footer />
        </main>
    );
}
