const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const LEVEL_STYLES = {
  All:         'bg-zinc-700/60 text-zinc-300',
  Rx:          'bg-red-900/60 text-red-300',
  Scaled:      'bg-sky-900/50 text-sky-300',
  Foundations: 'bg-emerald-900/50 text-emerald-300',
}

const schedule = {
  Monday: [
    { time: '5:30 AM',  name: 'Morning WOD',   coach: 'Marcus', level: 'All' },
    { time: '9:00 AM',  name: 'Foundations',   coach: 'Sarah',  level: 'Foundations' },
    { time: '12:00 PM', name: 'Lunch WOD',     coach: 'Jake',   level: 'Rx' },
    { time: '5:30 PM',  name: 'Evening WOD',   coach: 'Marcus', level: 'All' },
    { time: '7:00 PM',  name: 'Barbell Club',  coach: 'Jake',   level: 'Rx' },
  ],
  Tuesday: [
    { time: '5:30 AM',  name: 'Morning WOD',  coach: 'Sarah',  level: 'All' },
    { time: '9:00 AM',  name: 'Open Gym',     coach: 'Jake',   level: 'All' },
    { time: '12:00 PM', name: 'Lunch WOD',    coach: 'Marcus', level: 'Scaled' },
    { time: '5:30 PM',  name: 'Evening WOD',  coach: 'Sarah',  level: 'All' },
    { time: '7:00 PM',  name: 'Gymnastics',   coach: 'Sarah',  level: 'All' },
  ],
  Wednesday: [
    { time: '5:30 AM',  name: 'Morning WOD',  coach: 'Jake',   level: 'All' },
    { time: '9:00 AM',  name: 'Foundations',  coach: 'Marcus', level: 'Foundations' },
    { time: '12:00 PM', name: 'Lunch WOD',    coach: 'Sarah',  level: 'Rx' },
    { time: '5:30 PM',  name: 'Evening WOD',  coach: 'Jake',   level: 'All' },
    { time: '7:00 PM',  name: 'Mobility',     coach: 'Sarah',  level: 'All' },
  ],
  Thursday: [
    { time: '5:30 AM',  name: 'Morning WOD',  coach: 'Marcus', level: 'All' },
    { time: '9:00 AM',  name: 'Open Gym',     coach: 'Sarah',  level: 'All' },
    { time: '12:00 PM', name: 'Lunch WOD',    coach: 'Jake',   level: 'Scaled' },
    { time: '5:30 PM',  name: 'Evening WOD',  coach: 'Marcus', level: 'All' },
    { time: '7:00 PM',  name: 'Barbell Club', coach: 'Jake',   level: 'Rx' },
  ],
  Friday: [
    { time: '5:30 AM',  name: 'Morning WOD',    coach: 'Sarah',       level: 'All' },
    { time: '9:00 AM',  name: 'Foundations',    coach: 'Jake',        level: 'Foundations' },
    { time: '12:00 PM', name: 'Lunch WOD',      coach: 'Marcus',      level: 'Rx' },
    { time: '5:30 PM',  name: 'Friday Funday',  coach: 'All Coaches', level: 'All' },
  ],
  Saturday: [
    { time: '8:00 AM',  name: 'Community WOD', coach: 'Marcus', level: 'All' },
    { time: '10:00 AM', name: 'Open Gym',       coach: 'Sarah',  level: 'All' },
    { time: '11:00 AM', name: 'Competitors',    coach: 'Jake',   level: 'Rx' },
  ],
  Sunday: [
    { time: '9:00 AM',  name: 'Sunday WOD', coach: 'Sarah', level: 'All' },
    { time: '11:00 AM', name: 'Open Gym',   coach: 'Jake',  level: 'All' },
  ],
}

export default function Schedule() {
  return (
    <section id="schedule" className="bg-zinc-900 py-24 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <p className="font-heading font-bold text-[11px] tracking-[0.3em] uppercase text-red-500 mb-3">Weekly Classes</p>
          <h2 className="font-heading font-black italic text-5xl sm:text-6xl text-white mb-4">CLASS SCHEDULE</h2>
          <p className="text-zinc-400 max-w-lg mx-auto text-sm">
            Multiple sessions every day keep you consistent. Find your slot and show up.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.entries(LEVEL_STYLES).map(([level, cls]) => (
            <span key={level} className={`px-3 py-1 text-[10px] font-heading font-bold tracking-widest uppercase rounded-sm ${cls}`}>
              {level}
            </span>
          ))}
        </div>

        {/* Grid — horizontal scroll on mobile */}
        <div className="overflow-x-auto rounded-sm">
          <div className="min-w-[840px]">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-px bg-zinc-800">
              {DAYS.map(day => (
                <div key={day} className="bg-zinc-950 px-3 py-3 text-center">
                  <span className="font-heading font-black text-xs tracking-widest uppercase text-zinc-400">
                    {day.slice(0, 3).toUpperCase()}
                  </span>
                </div>
              ))}
            </div>

            {/* Slots */}
            <div className="grid grid-cols-7 gap-px bg-zinc-800">
              {DAYS.map(day => (
                <div key={day} className="bg-zinc-900 p-2 space-y-2">
                  {schedule[day].map((cls, i) => (
                    <div
                      key={i}
                      className="bg-zinc-950 border border-zinc-800 p-2.5 hover:border-red-600/40 transition-colors duration-200"
                    >
                      <div className="font-heading font-black text-[11px] text-red-500 mb-0.5">{cls.time}</div>
                      <div className="font-heading font-bold text-xs text-white leading-snug">{cls.name}</div>
                      <div className="text-zinc-600 text-[10px] mt-0.5">{cls.coach}</div>
                      <span className={`inline-block mt-1.5 px-1.5 py-0.5 text-[9px] font-heading font-bold tracking-wide rounded-sm ${LEVEL_STYLES[cls.level]}`}>
                        {cls.level}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-5">
          Schedule subject to change. Check with us for holiday hours.
        </p>
      </div>
    </section>
  )
}
