import { Phone, Mail } from 'lucide-react'

interface FooterProps {
  onBookNow: () => void
}

const FOOTER_LINKS = {
  services: {
    title: 'Services',
    links: [
      'YEG Airport Transfers',
      'YQU Airport Transfers',
      'Corporate Logistics',
      'Special Events',
    ],
  },
  company: {
    title: 'Company',
    links: [
      'About Executive Driving',
      'Chauffeur Standards',
      'Careers',
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      'Terms of Service',
      'Privacy Policy',
      'Client Bill of Rights',
    ],
  },
}

export default function Footer({ onBookNow }: FooterProps) {
  return (
    <footer className="relative pt-24 sm:pt-28 pb-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Block */}
        <div className="text-center mb-20 sm:mb-24">
          <p className="section-tag mb-4">Get Started</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Simplify Your Corporate
            <br />
            <span className="gold-gradient-text">Ground Logistics.</span>
          </h2>
          <p className="text-platinum-dim max-w-xl mx-auto mb-10 text-base">
            Apply for an Executive Driving corporate account and streamline every transfer, every time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onBookNow}
              className="px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-obsidian-deep font-semibold rounded-xl hover:from-gold-light hover:to-gold transition-all duration-300 shadow-lg shadow-gold/10"
            >
              Book Executive Transfer Now
            </button>
            <a
              href="mailto:info@executivedriving.ca?subject=Corporate%20Account%20Inquiry"
              className="px-8 py-4 border border-white/10 text-platinum font-semibold rounded-xl hover:bg-white/5 hover:border-white/15 transition-all duration-300"
            >
              Open Corporate Account
            </a>
          </div>
        </div>

        {/* 4-column footer grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pt-10 border-t border-white/8">
          {/* Column 1: Brand + Dispatch */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-5">
              <img src="/images/logo.webp" alt="Executive Driving" className="h-30 w-auto object-contain" />
            </div>
            <p className="text-sm text-platinum-dim leading-relaxed mb-5">
              Crafted Journeys, Elevated Comfort.
              <br />
              Alberta's premier private chauffeur service.
            </p>
            <div className="space-y-2.5">
              <a href="tel:8259739800" className="flex items-center gap-2.5 text-sm text-platinum hover:text-gold transition-colors font-medium">
                <Phone size={15} className="text-gold/60" />
                825.973.9800
              </a>
              <p className="text-[11px] text-platinum-dim/40 pl-[27px]">24/7 Executive Dispatch Line</p>
              <a href="mailto:info@executivedriving.ca" className="flex items-center gap-2.5 text-sm text-platinum-dim hover:text-gold transition-colors">
                <Mail size={15} className="text-gold/60" />
                info@executivedriving.ca
              </a>
            </div>
          </div>

          {/* Columns 2-4: Link groups */}
          {Object.values(FOOTER_LINKS).map(group => (
            <div key={group.title}>
              <h4 className="text-[11px] font-semibold text-platinum-dim/60 mb-5 tracking-[0.2em] uppercase">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map(label => (
                  <li key={label}>
                    <a
                      href="#"
                      onClick={e => e.preventDefault()}
                      className="text-sm text-platinum-dim/70 hover:text-gold transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div className="mt-10 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className="text-[10px] text-platinum-dim/25 uppercase tracking-[0.2em] mr-1">We Accept</span>
            {[
              { src: '/images/visa.jpeg', alt: 'Visa' },
              { src: '/images/mastercard.jpeg', alt: 'Mastercard' },
              { src: '/images/amex.jpeg', alt: 'American Express' },
              { src: '/images/interac.jpeg', alt: 'Interac e-Transfer' },
            ].map(card => (
              <div key={card.alt} className="h-8 w-12 rounded-md border border-white/6 bg-white/[0.03] p-1 flex items-center justify-center overflow-hidden hover:border-white/12 transition-colors">
                <img src={card.src} alt={card.alt} className="h-full w-full object-contain" />
              </div>
            ))}
            {['Cash', 'Invoice'].map(m => (
              <span key={m} className="h-8 px-3 rounded-md border border-white/6 bg-white/[0.03] text-[11px] text-platinum-dim/40 font-medium flex items-center">
                {m}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <a href="https://facebook.com/ExecutiveDrivingGP" target="_blank" rel="noopener noreferrer" className="text-xs text-platinum-dim/30 hover:text-gold transition-colors">
              Facebook
            </a>
            <a href="https://instagram.com/executivedrivingab" target="_blank" rel="noopener noreferrer" className="text-xs text-platinum-dim/30 hover:text-gold transition-colors">
              Instagram
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-platinum-dim/20">
            © {new Date().getFullYear()} Executive Driving. All rights reserved. Edmonton & Grande Prairie, Alberta.
          </p>
        </div>
      </div>
    </footer>
  )
}
