import { MessageSquare, Plane, DollarSign, Shield, Clock, Lock } from 'lucide-react'

const FEATURES = [
  {
    icon: MessageSquare,
    title: '24/7 Instant Dispatch',
    description: 'Booking confirmations and real-time driver assignment notifications sent directly to your device within seconds of reservation.',
    badge: 'Always On',
  },
  {
    icon: Plane,
    title: 'Proactive Flight Tracking',
    description: 'We monitor your flight in real-time — adjusting pickup schedules automatically for early arrivals or delays. Zero missed pickups.',
    badge: 'Live',
  },
  {
    icon: DollarSign,
    title: 'Guaranteed Corporate Pricing',
    description: 'Distance-based, all-inclusive rates with absolutely zero surge pricing. Transparent quotes locked at booking — no surprises, ever.',
    badge: 'No Surge',
  },
]

const TRUST_PILLARS = [
  {
    icon: Clock,
    stat: '15 min',
    label: 'Early Staging',
    detail: 'Chauffeurs arrive 15 minutes prior to departure for a calm, punctual pickup.',
  },
  {
    icon: Shield,
    stat: '100%',
    label: 'Vetted Drivers',
    detail: 'Background checks, defensive driving certifications, and NDAs on every chauffeur.',
  },
  {
    icon: Lock,
    stat: 'AES-256',
    label: 'Encrypted Data',
    detail: 'Enterprise-grade encryption on all payment processing and booking profiles.',
  },
  {
    icon: Plane,
    stat: 'Live',
    label: 'Flight Guard',
    detail: 'Proactive flight monitoring adjusts pickup for every early or delayed arrival.',
  },
]

export default function ValueProposition() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep via-obsidian to-obsidian-deep" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <p className="section-tag mb-4">Service Excellence</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Punctual. Proactive.
            <br />
            <span className="gold-gradient-text">Discreet. Guaranteed.</span>
          </h2>
          <p className="text-platinum-dim max-w-2xl mx-auto text-base">
            Every reservation triggers instant confirmation, real-time tracking, and seamless dispatch coordination.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-20 sm:mb-28" data-stagger>
          {FEATURES.map(f => (
            <div
              key={f.title}
              data-stagger-item
              className="glass-panel rounded-2xl p-6 sm:p-8 group hover:border-gold/20 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px animate-shimmer" />
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-xl bg-gold/8 border border-gold/15">
                  <f.icon size={22} className="text-gold" />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-gold/60 px-2.5 py-1 rounded-full border border-gold/15 bg-gold/[0.04]">
                  {f.badge}
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-white mb-3">
                {f.title}
              </h3>
              <p className="text-sm text-platinum-dim leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <p className="section-tag mb-3">Operational Standards</p>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Enterprise Trust & Safety
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5" data-stagger>
          {TRUST_PILLARS.map(p => (
            <div key={p.label} data-stagger-item
              className="glass-panel rounded-2xl p-5 sm:p-6 text-center hover:border-gold/15 transition-all duration-300">
              <div className="inline-flex p-3 rounded-xl bg-gold/8 mb-4">
                <p.icon size={20} className="text-gold" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold gold-gradient-text mb-1">{p.stat}</p>
              <p className="text-sm font-semibold text-white mb-2">{p.label}</p>
              <p className="text-xs text-platinum-dim leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
