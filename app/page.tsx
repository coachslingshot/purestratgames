import Navbar from '@/components/Navbar';
import GameCard from '@/components/GameCard';
import LeaderboardStrip from '@/components/LeaderboardStrip';
import Footer from '@/components/Footer';
import QuickPlayStrip from '@/components/QuickPlayStrip';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ color: '#F4F4F5' }}>
      {/* ── Sticky Navigation ─────────────────────────────────────── */}
      <Navbar />

      {/* ── Section 1: Hero ───────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 pt-8 pb-32"
        style={{ minHeight: '80vh' }}
      >
        {/* Refined top rule */}
        <div
          className="w-px h-12 mb-8 mx-auto"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(225,29,72,0.4))' }}
          aria-hidden="true"
        />

        {/* Quick-access game logo strip */}
        <QuickPlayStrip />

        {/* Logo / Brand */}
        <h1
          className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-none"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          Pure<span style={{ color: '#E11D48' }}>Strat</span><br />
          <span className="text-white">Games</span>
        </h1>

        {/* Tagline */}
        <p
          className="text-lg md:text-2xl font-semibold tracking-wide text-white mb-3"
          style={{ fontFamily: 'var(--font-subhead)', letterSpacing: '0.05em' }}
        >
          No dice. No draws. Just decisions.
        </p>

        {/* Slogan */}
        <p
          className="text-sm md:text-base font-medium tracking-widest mb-10"
          style={{
            fontFamily: 'var(--font-subhead)',
            color: '#E11D48',
            letterSpacing: '0.1em',
          }}
        >
          Every move reveals the mind.
        </p>

        {/* Blurb */}
        <p
          className="max-w-xl text-zinc-400 leading-relaxed text-base md:text-lg"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Enter a world built on intellect and precision. PureStrat Games
          delivers true 0% luck gameplay — where foresight, discipline, and
          psychological control define victory. Begin your journey with{' '}
          <span className="text-white">DualSuit Jujitsu</span> and{' '}
          <span className="text-white">Psychological Jujitsu</span>.
        </p>

        {/* Bottom fade-to-next */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #12141A)' }}
          aria-hidden="true"
        />
      </section>

      {/* ── Section 2: Game Showcase ──────────────────────────────── */}
      <section
        id="games"
        className="py-24 px-6"
        style={{ background: '#12141A' }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Section Label */}
          <div className="text-center mb-14">
            <p
              className="text-xs tracking-widest uppercase text-rose-500 mb-3"
              style={{ fontFamily: 'var(--font-subhead)' }}
            >
              Titles
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Choose Your Game
            </h2>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <GameCard
              title="Psychological Jujitsu"
              subtitle="13 Card Mind Combat"
              description="For 2 to 3 players. Read, feint, and outthink — pure mental combat. A game of projected intent and controlled deception."
              status="coming-soon"
              motif="🧠"
              imageSrc="/psych-jujitsu-logo.png"
            />
            <GameCard
              title="DualSuit Jujitsu"
              subtitle="Heightened 26 Card Combat"
              description="For 2 to 5 players. Balance aggression and defense through perfect pattern play. A deterministic card duel built entirely on anticipation and precision."
              status="live"
              href="http://localhost:5173"
              motif="🃏"
              imageSrc="/dualsuit-jujitsu-logo.png"
            />
          </div>
        </div>
      </section>

      {/* ── Section 3: About ──────────────────────────────────────── */}
      <section
        id="about"
        className="py-24 px-6"
        style={{ background: '#0E1016' }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div>
            <p
              className="text-xs tracking-widest uppercase text-rose-500 mb-4"
              style={{ fontFamily: 'var(--font-subhead)' }}
            >
              Philosophy
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              The Pursuit of Pure Competition
            </h2>
            <p
              className="text-zinc-400 leading-relaxed text-base"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              We feature deterministic games where every outcome is skill-driven.
              No randomness. No luck. No excuses.
            </p>
            <p
              className="text-zinc-400 leading-relaxed text-base mt-4"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Analytical players, coaches, and competitors come here to test
              thinking itself — to anticipate, calculate, and counter with precision.
            </p>
            <p
              className="text-zinc-500 mt-8 text-sm italic"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              "Build patterns, break minds, and master pure competition."
            </p>
          </div>

          {/* Graphic — abstract tactical grid */}
          <div
            className="relative flex items-center justify-center"
            style={{ minHeight: '260px' }}
          >
            {/* Outer ring */}
            <div
              className="absolute w-56 h-56 rounded-full opacity-20"
              style={{ border: '1px solid #E11D48' }}
            />
            {/* Middle ring */}
            <div
              className="absolute w-36 h-36 rounded-full opacity-30"
              style={{ border: '1px solid #E11D48', animation: 'spin 12s linear infinite' }}
            />
            {/* Inner ring */}
            <div
              className="absolute w-20 h-20 rounded-full opacity-40"
              style={{ border: '1px solid #E11D48', animation: 'spin 6s linear infinite reverse' }}
            />
            {/* Center dot */}
            <div
              className="w-4 h-4 rounded-full"
              style={{ background: '#E11D48', boxShadow: '0 0 20px rgba(225,29,72,0.6)' }}
            />
          </div>
        </div>
      </section>

      {/* ── Section 4: Leaderboard ────────────────────────────────── */}
      <LeaderboardStrip />

      {/* ── Section 5: Footer ─────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
