const PARTNERS = [
  'TARA Energy Services',
  'Browns Socialhouse',
  'Explore Edmonton',
  "Edward's Factory Outlet",
  'GP Chamber of Commerce',
  'Y Drive Canada',
]

export default function Partners() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center section-tag mb-8 sm:mb-10">
          Our Growing Network of Trusted Partners
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-10 gap-y-3 sm:gap-y-4" data-stagger>
          {PARTNERS.map(name => (
            <div
              key={name}
              data-stagger-item
              className="px-7 py-4 rounded-xl border border-white/6 bg-white/[0.02] text-base sm:text-lg text-platinum-dim/50 font-medium tracking-wide hover:border-gold/15 hover:text-gold/50 transition-all duration-300"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
