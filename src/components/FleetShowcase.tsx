import { useState } from 'react'
import { Users, Briefcase, Wifi, Shield, Snowflake, Check, ChevronLeft, ChevronRight, Zap, ThermometerSun, Coffee } from 'lucide-react'

interface FleetShowcaseProps {
  onBookNow: () => void
}

interface Vehicle {
  id: string
  name: string
  subtitle: string
  badge: string
  images: string[]
  passengers: number
  luggage: string
  features: string[]
  priceFrom: string
  description: string
}

const FLEET: Vehicle[] = [
  {
    id: 'navigator',
    name: 'Lincoln Navigator L',
    subtitle: 'Black Label — Premium SUV',
    badge: 'Available Now',
    images: [
      '/images/navigator1.jpeg',
      '/images/navigator2.jpeg',
      '/images/navigator3.jpeg',
      '/images/navigator4.jpeg',
      '/images/navigator5.jpeg',
    ],
    passengers: 6,
    luggage: '4 Large Bags',
    features: ['Wi-Fi Included', 'Climate Control', 'Device Charging', 'Flight Tracking'],
    priceFrom: '$175',
    description: 'Our Black Label Lincoln Navigator embodies understated elegance, perfect for corporate transfers, airport service, and executive transportation. The extended wheelbase delivers exceptional legroom and comfort for up to 6 passengers.',
  },
  {
    id: 'denali',
    name: 'GMC Denali',
    subtitle: 'Signature Edition — Premium SUV',
    badge: 'Popular Choice',
    images: [
      '/images/denali1.jpeg',
      '/images/denali2.jpeg',
      '/images/denali3.jpeg',
      '/images/denali4.jpeg',
      '/images/denali5.jpeg',
    ],
    passengers: 6,
    luggage: '4 Large Bags',
    features: ['Wi-Fi Included', 'Climate Control', 'Device Charging', 'Flight Tracking'],
    priceFrom: '$165',
    description: 'Make a statement with our GMC Denali. Ideal for weddings, special celebrations, and clients who prefer a distinctive look. Same premium amenities, same professional service — with head-turning presence.',
  },
  {
    id: 'transit',
    name: 'Ford Transit AWD',
    subtitle: 'Executive Passenger Van',
    badge: 'Group Travel',
    images: [
      '/images/transit1.jpeg',
      '/images/transit2.jpeg',
      '/images/transit3.jpeg',
      '/images/transit4.jpeg',
      '/images/transit5.jpeg',
    ],
    passengers: 14,
    luggage: 'Ample Cargo',
    features: ['Leather Interior', 'Wi-Fi Included', 'All-Wheel Drive', 'Regular Seating'],
    priceFrom: '$225',
    description: 'Built for group movement without losing the Executive Driving feel. Leather interior comfort, included Wi-Fi, regular forward-facing seating, and capacity for larger teams, event groups, and shuttle-style travel.',
  },
]

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(i => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setCurrent(i => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="relative group h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]">
      {images.map((src, i) => (
        <img key={src} src={src} alt={`${alt} - ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-panel/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-panel/30 hidden lg:block" />

      <button onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 border border-white/10 text-platinum-dim hover:text-gold hover:border-gold/30 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm">
        <ChevronLeft size={18} />
      </button>
      <button onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 border border-white/10 text-platinum-dim hover:text-gold hover:border-gold/30 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm">
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-gold w-6' : 'bg-white/25 w-1.5 hover:bg-white/40'}`} />
        ))}
      </div>
    </div>
  )
}

export default function FleetShowcase({ onBookNow }: FleetShowcaseProps) {
  const [active, setActive] = useState(0)

  return (
    <section id="fleet" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.02)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <p className="section-tag mb-4">Executive Fleet Services</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Immaculately Maintained.
            <br />
            <span className="gold-gradient-text">Purpose-Built for Executive Travel.</span>
          </h2>
          <p className="text-platinum-dim max-w-2xl mx-auto text-base">
            Every vehicle is guaranteed as selected — or receive a complimentary upgrade.
          </p>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          {FLEET.map((v, i) => (
            <button key={v.id} onClick={() => setActive(i)}
              className={`px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                active === i
                  ? 'bg-gradient-to-r from-gold to-gold-dark text-obsidian-deep shadow-lg shadow-gold/15'
                  : 'border border-white/8 bg-white/[0.02] text-platinum-dim hover:text-platinum hover:border-white/15'
              }`}>
              <span className="hidden sm:inline">{v.name}</span>
              <span className="sm:hidden">{v.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          {FLEET.map((vehicle, index) => (
            <div key={vehicle.id}
              className={`transition-all duration-500 ${active === index ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-4 absolute inset-x-0 top-0 pointer-events-none'}`}>
              {active === index && (
                <div className="glass-panel rounded-2xl overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden">
                      <ImageCarousel images={vehicle.images} alt={vehicle.name} />
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm">
                        <span className="text-xs font-medium text-gold">{vehicle.badge}</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                      <p className="section-tag mb-3">{vehicle.subtitle}</p>
                      <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                        {vehicle.name}
                      </h3>
                      <p className="text-sm sm:text-base text-platinum-dim leading-relaxed mb-8">
                        {vehicle.description}
                      </p>

                      <div className="flex flex-wrap gap-2.5 mb-8">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gold/8 border border-gold/20">
                          <Users size={15} className="text-gold" />
                          <span className="text-sm sm:text-base font-semibold text-white">{vehicle.passengers} Passengers</span>
                        </div>
                        <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gold/8 border border-gold/20">
                          <Briefcase size={15} className="text-gold" />
                          <span className="text-sm sm:text-base font-semibold text-white">{vehicle.luggage}</span>
                        </div>
                        {vehicle.features.map(f => (
                          <div key={f} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/8">
                            <Check size={13} className="text-gold shrink-0" />
                            <span className="text-xs sm:text-sm font-medium text-platinum">{f}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-6 border-t border-white/8">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-platinum-dim mb-1">Estimated Rates From</p>
                          <p className="text-3xl sm:text-4xl font-bold text-gold">{vehicle.priceFrom}<span className="text-base font-normal text-platinum-dim ml-1.5">CAD</span></p>
                          <p className="text-[11px] text-platinum-dim/40 mt-1.5 max-w-xs leading-relaxed">*Final quote calculated dynamically based on exact pickup, destination, and hourly requirements.</p>
                        </div>
                        <button onClick={onBookNow}
                          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-obsidian-deep text-sm sm:text-base font-bold rounded-xl hover:from-gold-light hover:to-gold transition-all duration-300 shadow-lg shadow-gold/10">
                          Reserve This Vehicle
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/8 px-6 sm:px-8 py-4 flex flex-wrap justify-center gap-4 sm:gap-8">
                    {[
                      { icon: Wifi, label: 'Complimentary Wi-Fi' },
                      { icon: ThermometerSun, label: 'Climate Control' },
                      { icon: Zap, label: 'Device Charging' },
                      { icon: Coffee, label: 'Complimentary Beverages' },
                      { icon: Shield, label: 'Fully Insured' },
                      { icon: Snowflake, label: '24/7 Available' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2 text-xs text-platinum-dim">
                        <Icon size={13} className="text-gold/50" />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
