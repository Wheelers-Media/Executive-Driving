import { useState, useEffect } from 'react'
import { Menu, X, Lock } from 'lucide-react'

interface NavigationProps {
  onBookNow: () => void
}

export default function Navigation({ onBookNow }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-md bg-black/60 border-b border-white/10 shadow-2xl shadow-black/50'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo only — no text branding */}
          <a href="/" className="shrink-0">
            <img
              src="/images/logo.webp"
              alt="Executive Driving"
              className="h-8 sm:h-20 w-auto object-contain"
            />
          </a>

          {/* Desktop nav — right side */}
          <div className="hidden md:flex items-center gap-6 lg:gap-7">
            <button onClick={() => scrollTo('fleet')} className="text-[13px] text-platinum-dim hover:text-white transition-colors duration-200">
              Fleet
            </button>
            <button onClick={() => scrollTo('services')} className="text-[13px] text-platinum-dim hover:text-white transition-colors duration-200">
              Services
            </button>
            <a
              href="#"
              onClick={e => e.preventDefault()}
              className="flex items-center gap-1.5 text-[13px] text-platinum-dim/40 cursor-not-allowed group"
              title="Corporate portal coming soon"
            >
              <Lock size={11} className="text-gold/30 group-hover:text-gold/50 transition-colors" />
              <span className="group-hover:text-platinum-dim/60 transition-colors">Corporate Accounts</span>
            </a>
            <button
              onClick={onBookNow}
              className="px-5 py-2.5 bg-gradient-to-r from-gold to-gold-dark text-obsidian-deep text-[13px] font-semibold rounded-lg hover:from-gold-light hover:to-gold transition-all duration-300 animate-pulse-gold"
            >
              Book Transfer
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-platinum-dim hover:text-gold transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden backdrop-blur-md bg-black/70 border-t border-white/10">
          <div className="px-5 py-5 space-y-1">
            <button onClick={() => scrollTo('fleet')} className="block w-full text-left py-3 text-[15px] text-platinum-dim hover:text-white transition-colors">
              Fleet
            </button>
            <button onClick={() => scrollTo('services')} className="block w-full text-left py-3 text-[15px] text-platinum-dim hover:text-white transition-colors">
              Services
            </button>
            <a href="#" onClick={e => e.preventDefault()} className="flex items-center gap-2 py-3 text-[15px] text-platinum-dim/40 cursor-not-allowed">
              <Lock size={13} className="text-gold/30" />
              <span>Corporate Accounts</span>
              <span className="ml-auto text-[10px] tracking-wider uppercase text-gold/25 border border-gold/15 rounded px-1.5 py-0.5">Soon</span>
            </a>
            <div className="pt-3">
              <button
                onClick={() => { setMobileOpen(false); onBookNow() }}
                className="w-full py-3.5 bg-gradient-to-r from-gold to-gold-dark text-obsidian-deep font-semibold rounded-xl text-[15px]"
              >
                Book Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
