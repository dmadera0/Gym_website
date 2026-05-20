import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/95 backdrop-blur-sm shadow-lg shadow-black/30 border-b border-zinc-900'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-red-600 flex items-center justify-center group-hover:bg-red-700 transition-colors">
              <span className="text-white font-heading font-black text-base leading-none tracking-tight">IB</span>
            </div>
            <div className="leading-none">
              <div className="font-heading font-black text-white text-base tracking-widest uppercase">IRON BOX</div>
              <div className="font-heading font-semibold text-red-500 text-[10px] tracking-[0.25em] uppercase">CrossFit</div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="font-heading font-semibold text-[11px] tracking-[0.18em] uppercase text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-heading font-black text-[11px] tracking-[0.2em] uppercase transition-colors duration-200"
            >
              Join Now
            </a>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden text-zinc-400 hover:text-white transition-colors p-1"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-zinc-800 py-4 space-y-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 font-heading font-semibold text-sm tracking-widest uppercase text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="w-full flex justify-center py-3 bg-red-600 hover:bg-red-700 text-white font-heading font-black text-xs tracking-[0.2em] uppercase transition-colors duration-200"
              >
                Join Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
