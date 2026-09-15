import { Star } from 'lucide-react'

const REVIEWS = [
  {
    quote: 'Seamless YEG airport transfers for our executive team. Always punctual, immaculate vehicles.',
    name: 'Marcus T.',
    role: 'Corporate Logistics Director',
  },
  {
    quote: 'The discretion and service provided during our executive retreat in Grande Prairie was world-class.',
    name: 'Elena R.',
    role: 'Managing Partner',
  },
  {
    quote: 'Gezim and his team operate at a level above any standard car service in Alberta. Highly recommended.',
    name: 'David K.',
    role: 'Energy Sector Executive',
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-18">
          <p className="section-tag mb-4">Client Testimonials</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by Alberta's
            <br />
            <span className="gold-gradient-text">Executive Travelers.</span>
          </h2>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gold/20 bg-gold/[0.04]">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-gold fill-gold" />
              ))}
            </div>
            <span className="text-sm text-platinum font-medium">5.0 Stars</span>
            <span className="w-px h-4 bg-white/15" />
            <span className="text-sm text-platinum-dim">22+ Verified Google Reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6" data-stagger>
          {REVIEWS.map(r => (
            <div
              key={r.name}
              data-stagger-item
              className="relative bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:border-gold/15 transition-all duration-500"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="text-gold/70 fill-gold/70" />
                ))}
              </div>
              <p className="text-[15px] text-platinum leading-relaxed mb-6 font-light italic">
                "{r.quote}"
              </p>
              <div className="pt-5 border-t border-white/8">
                <p className="text-sm font-semibold text-white">{r.name}</p>
                <p className="text-xs text-platinum-dim mt-0.5">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
