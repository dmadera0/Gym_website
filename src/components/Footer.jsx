import { Instagram, Facebook, Youtube, Globe } from 'lucide-react'

const LINKS = {
  'Quick Links': [
    { label: 'Home',     href: '#home' },
    { label: 'About',   href: '#about' },
    { label: 'Schedule',href: '#schedule' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ],
  Programs: [
    { label: 'Foundations',  href: '#schedule' },
    { label: 'CrossFit WOD', href: '#schedule' },
    { label: 'Barbell Club', href: '#schedule' },
    { label: 'Gymnastics',   href: '#schedule' },
    { label: 'Competitors',  href: '#schedule' },
  ],
}

const SOCIALS = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook,  label: 'Facebook' },
  { icon: Youtube,   label: 'YouTube' },
  { icon: Globe,     label: 'Website' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 bg-red-600 group-hover:bg-red-700 transition-colors flex items-center justify-center">
                <span className="text-white font-heading font-black text-base leading-none tracking-tight">IB</span>
              </div>
              <div className="leading-none">
                <div className="font-heading font-black text-white text-base tracking-widest uppercase">IRON BOX</div>
                <div className="font-heading font-semibold text-red-500 text-[10px] tracking-[0.25em] uppercase">CrossFit</div>
              </div>
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Forging elite fitness and community in Austin since 2018.
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 border border-zinc-800 hover:border-zinc-600 flex items-center justify-center text-zinc-600 hover:text-white transition-colors duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="font-heading font-black text-[11px] tracking-[0.25em] uppercase text-zinc-400 mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <a href={item.href} className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors duration-200">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-black text-[11px] tracking-[0.25em] uppercase text-zinc-400 mb-4">Stay Updated</h4>
            <p className="text-zinc-500 text-sm leading-relaxed mb-4">
              WODs, events, and member news — delivered weekly.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-zinc-900 border border-zinc-700 border-r-0 text-white text-xs px-3 py-2.5 focus:outline-none focus:border-red-600 transition-colors placeholder-zinc-700"
              />
              <button
                type="submit"
                className="px-4 bg-red-600 hover:bg-red-700 text-white text-[10px] font-heading font-black tracking-widest uppercase transition-colors duration-200 flex-shrink-0"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-xs">
            © {year} Iron Box CrossFit. All rights reserved.
          </p>
          <p className="text-zinc-700 text-xs">
            CROSSFIT® is a registered trademark of CrossFit, LLC.
          </p>
        </div>
      </div>
    </footer>
  )
}
