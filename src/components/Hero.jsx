import { ChevronDown } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Members' },
  { value: '12',   label: 'Expert Coaches' },
  { value: '7',    label: 'Years Strong' },
  { value: '365',  label: 'WODs/Year' },
]

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col hero-pattern">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/30 to-zinc-950" />

      {/* Top red accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      {/* Main content */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-10">
        {/* Affiliate badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-red-600/40 bg-red-600/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-heading font-semibold text-[11px] tracking-[0.25em] uppercase text-red-400">
            Est. 2018 · Official CrossFit Affiliate · Austin, TX
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-heading font-black italic text-white leading-none mb-6 select-none">
          <span className="block text-[4.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] tracking-tighter drop-shadow-2xl">
            FORGE
          </span>
          <span className="block text-[3.5rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] xl:text-[10rem] tracking-tighter text-red-500 drop-shadow-2xl">
            YOUR LIMITS
          </span>
        </h1>

        {/* Sub copy */}
        <p className="max-w-lg text-zinc-400 text-base sm:text-lg leading-relaxed mb-10">
          Elite CrossFit coaching for every level. Build strength, endurance, and lifelong community at Iron Box.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-heading font-black text-sm tracking-[0.2em] uppercase transition-all duration-200 hover:scale-105 shadow-lg shadow-red-900/40"
          >
            Start Free Trial
          </a>
          <a
            href="#schedule"
            className="w-full sm:w-auto px-8 py-4 border border-zinc-600 hover:border-white text-zinc-300 hover:text-white font-heading font-bold text-sm tracking-[0.2em] uppercase transition-all duration-200"
          >
            View Schedule
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-36 left-1/2 -translate-x-1/2 hidden md:block text-zinc-600 hover:text-zinc-400 transition-colors animate-bounce"
      >
        <ChevronDown size={26} />
      </a>

      {/* Stats bar */}
      <div className="relative border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-800">
          {stats.map((s) => (
            <div key={s.label} className="text-center py-2 px-4">
              <div className="font-heading font-black text-3xl sm:text-4xl text-red-500">{s.value}</div>
              <div className="font-heading font-semibold text-[10px] tracking-widest uppercase text-zinc-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
