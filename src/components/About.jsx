import { Check, Award, Users, Target, Flame } from 'lucide-react'

const features = [
  'Scaled programming for every fitness level',
  'Personalized goal tracking and coaching',
  'State-of-the-art equipment and 6,000 sq ft facility',
  'In-house nutrition coaching and workshops',
]

const statCards = [
  { icon: Users,  value: '500+',  label: 'Active Members' },
  { icon: Award,  value: 'CF L3', label: 'Head Coach Certified' },
  { icon: Flame,  value: '3×',    label: 'Daily Class Sessions' },
  { icon: Target, value: '100%',  label: 'Coaches Certified' },
]

const coaches = [
  { name: 'Marcus Reid',   title: 'Head Coach & Founder',       cert: 'CrossFit Level 3 Trainer' },
  { name: 'Sarah Chen',    title: 'Strength & Conditioning',    cert: 'CrossFit L2 · NSCA-CSCS' },
  { name: 'Jake Morales',  title: 'Olympic Lifting Coach',      cert: 'CrossFit L2 · USAW Level 2' },
]

export default function About() {
  return (
    <section id="about" className="bg-zinc-950 py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Top grid — text + stat cards */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="font-heading font-bold text-[11px] tracking-[0.3em] uppercase text-red-500 mb-4">Who We Are</p>
            <h2 className="font-heading font-black italic text-5xl sm:text-6xl text-white leading-none mb-6">
              MORE THAN A GYM.<br />
              <span className="text-red-500">A COMMUNITY.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Founded in 2018, Iron Box CrossFit has grown from a garage gym into one of the most respected CrossFit affiliates in Central Texas. We believe fitness should be challenging, measurable, and — above all — sustainable.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Our certified coaches are passionate about helping every athlete, from the first-timer to the competitive Games hopeful, unlock their full potential through smart programming and relentless community support.
            </p>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 bg-red-600/15 border border-red-600/40 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-red-500" strokeWidth={3} />
                  </div>
                  <span className="text-zinc-300 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {statCards.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="bg-zinc-900 border border-zinc-800 p-6 hover:border-red-600/50 transition-colors duration-300 group"
              >
                <Icon size={20} className="text-red-500 mb-3" />
                <div className="font-heading font-black text-3xl text-white group-hover:text-red-400 transition-colors">{value}</div>
                <div className="font-heading font-semibold text-[10px] tracking-widest uppercase text-zinc-600 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Coaches */}
        <div>
          <div className="text-center mb-12">
            <p className="font-heading font-bold text-[11px] tracking-[0.3em] uppercase text-red-500 mb-3">Our Team</p>
            <h3 className="font-heading font-black italic text-4xl sm:text-5xl text-white">MEET THE COACHES</h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {coaches.map((coach) => (
              <div
                key={coach.name}
                className="bg-zinc-900 border border-zinc-800 hover:border-red-600/40 transition-colors duration-300 overflow-hidden group"
              >
                <div className="h-52 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center border-b border-zinc-800">
                  <div className="w-20 h-20 rounded-full bg-zinc-700 group-hover:bg-zinc-600 transition-colors flex items-center justify-center ring-2 ring-zinc-600 group-hover:ring-red-700 transition-all">
                    <span className="font-heading font-black text-2xl text-zinc-400">
                      {coach.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-heading font-black text-lg text-white">{coach.name}</h4>
                  <p className="font-heading font-semibold text-[11px] tracking-wider uppercase text-red-500 mt-1">{coach.title}</p>
                  <p className="text-zinc-600 text-xs mt-2">{coach.cert}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
