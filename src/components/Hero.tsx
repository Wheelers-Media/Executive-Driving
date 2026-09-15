import { Plane, Shield, Clock, Eye } from 'lucide-react'

interface HeroProps {
  onBookNow: () => void
}

const TRUST_BADGES = [
  { icon: Plane, label: 'Flight Tracking' },
  { icon: Clock, label: 'Guaranteed Punctuality' },
  { icon: Eye, label: 'Discreet Executive Transport' },
  { icon: Shield, label: 'Vetted Chauffeurs' },
]

export default function Hero({ onBookNow }: HeroProps) {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Hero Image */}
      <img
        src="/images/hero-tarmac.jpg"
        alt="Executive Driving VIP Transport"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
      />

      {/* Premium Luxury Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/60 to-black/40" />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center lg:max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/30 backdrop-blur-sm mb-8 sm:mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-platinum tracking-[0.2em] uppercase">Now Serving Alberta</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold leading-[1.05] tracking-tight mb-6 sm:mb-8 drop-shadow-2xl">
            <span className="text-white">Elite Executive</span>
            <br />
            <span className="text-white">Transportation</span>
            <br />
            <span className="gold-gradient-text">Across Alberta.</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12 drop-shadow-lg">
            Seamless VIP Airport Transfers, Corporate Travel & Private Chauffeur
            Services in Grande Prairie & Edmonton.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14 sm:mb-16">
            <button
              onClick={onBookNow}
              className="px-8 sm:px-10 py-4 bg-gradient-to-r from-gold to-gold-dark text-obsidian-deep text-sm sm:text-base font-bold rounded-xl hover:from-gold-light hover:to-gold transition-all duration-300 shadow-lg shadow-gold/15 animate-pulse-gold"
            >
              Reserve Your Transfer
            </button>
            <a
              href="tel:8259739800"
              className="px-8 sm:px-10 py-4 border border-white/20 bg-black/20 backdrop-blur-sm text-white text-sm sm:text-base font-medium rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              Call 825.973.9800
            </a>
          </div>

          <div className="border-t border-white/15 pt-8">
            <p className="section-tag mb-5">Corporate Accounts & Priority Dispatch</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3" data-stagger>
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-sm text-white/70" data-stagger-item>
                  <div className="p-1.5 rounded-md bg-gold/15 backdrop-blur-sm">
                    <Icon size={14} className="text-gold" />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
