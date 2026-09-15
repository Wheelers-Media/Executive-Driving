import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Shield, ChevronRight, ArrowRight, Check, X, AlertTriangle,
  TrendingUp, Zap, Truck, Crown, UserPlus, Star, LayoutDashboard,
  Search, Globe, MapPin, DollarSign,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const GROTESK = "'Space Grotesk', sans-serif"
const GOLD = '#D4AF37'
const GOLD_LIGHT = '#E5C54B'
const CYAN = '#66FCF1'

/* ─────────────────── DATA ─────────────────── */

const TODAY_STATE = [
  { icon: X, text: 'Manually entering client details after every booking call, taking about 10 minutes per booking', bad: true },
  { icon: X, text: 'Zero automated Google review collection. Trust is built entirely by word of mouth', bad: true },
  { icon: X, text: 'Spending $100/day ($3,000/month) on Google Ads with no organic fallback', bad: true },
  { icon: X, text: 'No centralized view of client history, trip records, or billing in one place', bad: true },
  { icon: X, text: 'Website that does not perform like an app on mobile, losing corporate EAs on first load', bad: true },
]

const FUTURE_STATE = [
  { icon: Check, text: 'Every booking form auto-builds a complete VIP client record with zero manual entry', bad: false },
  { icon: Check, text: 'Automated review request sent 30 min post-ride, compounding your 5-star reputation', bad: false },
  { icon: Check, text: 'GBP + SEO dominance in Edmonton & Grande Prairie cutting ad spend dependency significantly', bad: false },
  { icon: Check, text: 'White-label CRM portal: client profiles, trip history, and dispatch in one branded dashboard', bad: false },
  { icon: Check, text: 'App-quality web experience on every device that captures corporate EAs the moment they land', bad: false },
]

const MILESTONES = [
  {
    year: '2026',
    label: 'Where You Are',
    color: GOLD,
    items: ['5–6 active vehicles serving Edmonton & Grande Prairie', 'A proven base for corporate, airport and group travel', 'Manual client intake after every booking call', '$100/day Google Ads with no organic fallback'],
  },
  {
    year: '2027',
    label: '8-Vehicle Travel Network',
    color: CYAN,
    items: ['Add 2–3 Ford Transit Vans to reach 8 active vehicles', 'Grande Prairie becomes the go-to for Peace Region group travel', 'Capture corporate crews, airport groups, events and long-distance trips', '20 monthly bookings at $650 = $13,000/month before the premium tier'],
  },
  {
    year: '2027',
    label: 'End of 2027: Edmonton VIP Tier',
    color: GOLD_LIGHT,
    items: ['Rolls-Royce or Maybach sets Executive Driving apart in Edmonton', 'Move average booking value from $650 toward $850 with premium service, alcohol and add-ons', '20 monthly bookings at the $850 goal = $17,000/month', 'Win higher-value VIP, executive and special-occasion clients'],
  },
]

const SYSTEMS = [
  {
    icon: Globe,
    tier: 'A',
    title: 'App-Like Web Experience',
    description: 'A buttery-smooth, mobile-native website that performs like a premium app on every device. Dynamic fare estimator for YEG, YQU, and Peace Region corporate routes. No standalone app needed.',
  },
  {
    icon: Star,
    tier: 'A',
    title: 'Automated Google Review Engine',
    description: 'An automatic SMS sent to every client 30 minutes after trip completion, prompting a Google review. Compounds your 5-star reputation without lifting a finger.',
  },
  {
    icon: Search,
    tier: 'A',
    title: 'Google Business Profile & Local SEO',
    description: 'Full GBP optimization and structured local SEO for both Edmonton and Grande Prairie, designed to rank #1 organically and reduce your reliance on $100/day in paid ad spend.',
  },
  {
    icon: UserPlus,
    tier: 'B',
    title: 'Automated Customer Profile Creation',
    description: 'Every booking form submission automatically creates a complete VIP client record: contact info, trip history, vehicle preferences, and billing notes. No more pulling over to enter data.',
  },
  {
    icon: LayoutDashboard,
    tier: 'B',
    title: 'White-Label Executive Driving CRM Portal',
    description: 'A fully branded private dashboard where you can view every client, manage bookings, track trip history, and process corporate billing, all in one place and built for your workflow.',
  },
  {
    icon: Zap,
    tier: 'B',
    title: 'SMS Booking Confirmations & Trip Reminders',
    description: 'Automated confirmation and reminder texts sent at booking and before pickup. Keeps your personal touch while eliminating the manual follow-up loop.',
  },
]

const OPTION_A = {
  id: 'A',
  name: 'Option A',
  title: 'Digital Refresh & Local Dominance',
  subtitle: 'Website + Review Engine + Organic SEO',
  price: '$2,500',
  priceNote: 'CAD, One-Time Setup',
  monthly: '$197/mo',
  monthlyNote: 'Hosting, Maintenance & Site Updates',
  tag: null,
  includes: [
    'Custom app-like web experience (mobile & desktop)',
    'Dynamic fare estimator for YEG, YQU, GP & Peace Region corporate routes',
    'Automated post-ride Google Review SMS engine',
    'Google Business Profile full optimization',
    'Local SEO structuring for Edmonton & Grande Prairie',
    'Direct booking confirmation email setup',
  ],
  roi: [
    { label: 'Breakeven', value: '4 rides', note: 'at a $650 average, paid off in under a week of operations' },
    { label: 'Ad Spend Reduction', value: '20–40%', note: 'organic GBP traffic compounds over 60–90 days' },
    { label: 'Review Velocity', value: '10× faster', note: 'automated requests vs. waiting for clients to post' },
  ],
}

const OPTION_B = {
  id: 'B',
  name: 'Option B',
  title: 'The Complete VIP Operating System',
  subtitle: 'Everything in A + CRM Portal + Full Automation',
  price: '$3,200',
  priceNote: 'CAD, One-Time Setup',
  monthly: '$297/mo',
  monthlyNote: 'CRM Portal Hosting, Maintenance & Updates',
  tag: 'RECOMMENDED',
  includes: [
    'Everything in Option A, plus:',
    'White-label Executive Driving CRM portal (your brand, your data)',
    'Automated VIP client profile creation on every booking',
    'SMS booking confirmations & pre-ride reminders',
    'Corporate account billing & expense staging',
    'Priority support + fleet expansion scalability',
  ],
  roi: [
    { label: 'Admin Time Saved', value: '8+ hrs/mo', note: 'no more manual data entry between rides' },
    { label: 'Annual Ad Savings', value: '$3,600+', note: 'conservative 10% organic shift off $100/day spend' },
    { label: 'System Pays for Itself', value: '< 2 months', note: 'from ad savings alone, not counting time value' },
  ],
}

/* ─────────────────── TODAY vs 2027 TOGGLE ─────────────────── */
function StatComparison() {
  const [view, setView] = useState<'today' | 'future'>('today')

  return (
    <section className="relative py-24 sm:py-28">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-3">Honest Diagnostic</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: GROTESK }}>
            Where You Are vs. Where You'll Be
          </h2>

          {/* Toggle */}
          <div className="inline-flex rounded-xl border border-white/10 overflow-hidden">
            <button
              onClick={() => setView('today')}
              className={`px-7 py-3 text-sm font-semibold transition-all duration-300 ${
                view === 'today'
                  ? 'bg-red-500/15 text-red-400 border-r border-red-500/20'
                  : 'bg-white/[0.02] text-[#8A8F98] border-r border-white/8 hover:text-white'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setView('future')}
              className={`px-7 py-3 text-sm font-semibold transition-all duration-300 ${
                view === 'future'
                  ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                  : 'bg-white/[0.02] text-[#8A8F98] hover:text-white'
              }`}
            >
              End of 2027
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          {/* Today */}
          <div className={`transition-all duration-500 ${view === 'today' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'}`}>
            <div className="bg-white/[0.02] border border-red-500/15 rounded-2xl p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-7">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertTriangle size={18} className="text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white" style={{ fontFamily: GROTESK }}>
                  Executive Driving: Current State
                </h3>
                <span className="ml-auto text-[10px] tracking-[0.2em] uppercase text-red-400/60 border border-red-400/20 px-2.5 py-1 rounded-full">
                  Right Now
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {TODAY_STATE.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-red-500/10 mt-0.5 shrink-0">
                      <X size={12} className="text-red-400" />
                    </div>
                    <span className="text-sm text-[#8A8F98] leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 pt-6 border-t border-red-500/10 grid grid-cols-3 gap-4 text-center">
                {[
                  { stat: '3', label: 'Active Vehicles' },
                  { stat: '$3,000', label: 'Paid Ad Spend / Mo' },
                  { stat: '0', label: 'Automated Systems' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-red-400/70" style={{ fontFamily: GROTESK }}>{s.stat}</p>
                    <p className="text-[11px] text-[#8A8F98] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2027 */}
          <div className={`transition-all duration-500 ${view === 'future' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'}`}>
            <div className="bg-[#D4AF37]/[0.03] border border-[#D4AF37]/20 rounded-2xl p-7 sm:p-9 shadow-[0_0_60px_rgba(212,175,55,0.04)]">
              <div className="flex items-center gap-3 mb-7">
                <div className="p-2 rounded-lg bg-[#D4AF37]/10">
                  <Crown size={18} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-semibold text-white" style={{ fontFamily: GROTESK }}>
                  Executive Driving: End of 2027
                </h3>
                <span className="ml-auto text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/60 border border-[#D4AF37]/20 px-2.5 py-1 rounded-full">
                  With Wheeler's Media
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {FUTURE_STATE.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-[#D4AF37]/10 mt-0.5 shrink-0">
                      <Check size={12} className="text-[#D4AF37]" />
                    </div>
                    <span className="text-sm text-[#8A8F98] leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 pt-6 border-t border-[#D4AF37]/10 grid grid-cols-3 gap-4 text-center">
                {[
                  { stat: '8+', label: 'Active Vehicles' },
                  { stat: '$1,800', label: 'Estimated Ad Spend / Mo' },
                  { stat: '6', label: 'Automated Systems Running' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-[#D4AF37]" style={{ fontFamily: GROTESK }}>{s.stat}</p>
                    <p className="text-[11px] text-[#8A8F98] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Spacer to hold height when absolute-positioned */}
          <div className="invisible pointer-events-none">
            <div className="rounded-2xl p-7 sm:p-9 border border-transparent">
              <div className="h-8 mb-7" />
              <div className="grid sm:grid-cols-2 gap-4">
                {TODAY_STATE.map((_, i) => (
                  <div key={i} className="h-10" />
                ))}
              </div>
              <div className="mt-7 pt-6 border-t border-transparent grid grid-cols-3 gap-4">
                {[1,2,3].map(i => <div key={i} className="h-12" />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── GROWTH TIMELINE ─────────────────── */
function GrowthTimeline() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14" data-reveal>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: CYAN }}>Strategic Roadmap</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: GROTESK }}>
            Your 3-Year Growth Trajectory
          </h2>
          <p className="text-sm text-[#8A8F98] mt-3 max-w-2xl mx-auto">
            Build the engine now: grow from 6 to 8 vehicles next year, own Peace Region travel from Grande Prairie,
            and launch a standout Edmonton VIP tier by the end of 2027.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden sm:block absolute top-[3.25rem] left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-[#D4AF37]/30 via-[#66FCF1]/30 to-[#E5C54B]/30" />

          <div className="grid sm:grid-cols-3 gap-6">
            {MILESTONES.map(m => (
              <div key={m.year} data-reveal className="relative">
                <div className="text-center mb-5">
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 text-lg font-bold mb-3 relative z-10"
                    style={{ borderColor: m.color, color: m.color, backgroundColor: `${m.color}12` }}
                  >
                    {m.year}
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: m.color }}>{m.label}</p>
                </div>
                <div
                  className="bg-white/[0.03] border rounded-xl p-5 space-y-2.5"
                  style={{ borderColor: `${m.color}20` }}
                >
                  {m.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: m.color }} />
                      <span className="text-sm text-[#8A8F98]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jasper corridor callout */}
        <div data-reveal className="mt-10 bg-white/[0.03] border border-[#66FCF1]/15 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="p-3 rounded-xl shrink-0" style={{ background: `${CYAN}12`, border: `1px solid ${CYAN}25` }}>
            <MapPin size={22} style={{ color: CYAN }} />
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-1" style={{ color: CYAN }}>Grande Prairie Travel Market: The Growth Lane</p>
            <p className="text-sm text-[#8A8F98] leading-relaxed">
              Grande Prairie can become the booking hub for Peace Region travel: corporate crews, airport groups, events and longer-distance trips.
              New Transit Vans give groups a premium, right-sized alternative to a large coach bus, flexible enough for the trips that do not fit a standard shuttle.
              A clear rate estimator, strong search presence and simple booking flow make Executive Driving the obvious first call.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── ROI CALCULATOR ─────────────────── */
function ROICalculator() {
  const [rides, setRides] = useState(20)
  const [avgTicket, setAvgTicket] = useState(650)
  const [adSpend, setAdSpend] = useState(3000)

  const organicShift = 0.30

  const monthlyRevenue = rides * avgTicket
  const premiumRevenue = rides * 850
  const premiumUpside = premiumRevenue - monthlyRevenue
  const adSavings = Math.round(adSpend * organicShift)
  const annualAdSavings = adSavings * 12

  const fmt = (n: number) => n.toLocaleString('en-CA', { maximumFractionDigits: 0 })

  return (
    <section className="relative py-24 sm:py-28">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-reveal>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: CYAN }}>Run the Numbers</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: GROTESK }}>
            See What Each Booking Can Become
          </h2>
          <p className="text-sm text-[#8A8F98] max-w-xl mx-auto">
            Start with your real monthly bookings. Then see the clear upside of moving an average booking from $650 toward $850.
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl p-7 sm:p-10" data-reveal>
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            {/* Slider 1: Rides */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-sm text-[#8A8F98]">Monthly Corporate Rides</span>
                <span className="text-xl font-bold text-white" style={{ fontFamily: GROTESK }}>{rides}</span>
              </div>
              <input type="range" min={1} max={50} value={rides} onChange={e => setRides(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D4AF37]
                  [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(212,175,55,0.4)]
                  [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0B0C10]"
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-[11px] text-[#8A8F98]/50">1</span>
                <span className="text-[11px] text-[#8A8F98]/50">50</span>
              </div>
            </div>

            {/* Slider 2: Average booking */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-sm text-[#8A8F98]">Average Booking Value</span>
                <span className="text-xl font-bold text-white" style={{ fontFamily: GROTESK }}>${fmt(avgTicket)}</span>
              </div>
              <input type="range" min={500} max={1000} step={25} value={avgTicket} onChange={e => setAvgTicket(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D4AF37]
                  [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(212,175,55,0.4)]
                  [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0B0C10]"
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-[11px] text-[#8A8F98]/50">$500</span>
                <span className="text-[11px] text-[#D4AF37]/70">Goal: $850</span>
                <span className="text-[11px] text-[#8A8F98]/50">$1,000</span>
              </div>
            </div>

            {/* Slider 3: Ad Spend */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-sm text-[#8A8F98]">Current Monthly Ad Spend</span>
                <span className="text-xl font-bold text-white" style={{ fontFamily: GROTESK }}>${fmt(adSpend)}</span>
              </div>
              <input type="range" min={500} max={6000} step={100} value={adSpend} onChange={e => setAdSpend(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#66FCF1]
                  [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(102,252,241,0.4)]
                  [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0B0C10]"
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-[11px] text-[#8A8F98]/50">$500</span>
                <span className="text-[11px] text-[#8A8F98]/50">$6,000</span>
              </div>
            </div>
          </div>

          <p className="text-xs tracking-[0.2em] uppercase text-[#D4AF37]/70 font-semibold mb-3">What this means each month</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Revenue at your current average', value: `$${fmt(monthlyRevenue)}`, color: GOLD, sub: `${rides} bookings × $${fmt(avgTicket)}` },
              { label: 'Revenue at the $850 goal', value: `$${fmt(premiumRevenue)}`, color: GOLD_LIGHT, sub: 'premium service + add-ons' },
              { label: 'Extra monthly upside', value: `+$${fmt(premiumUpside)}`, color: CYAN, sub: 'if each booking reaches $850' },
              { label: 'SEO savings each month', value: `$${fmt(adSavings)}`, color: CYAN, sub: '~30% less paid advertising' },
            ].map(m => (
              <div key={m.label} className="bg-white/[0.03] border border-white/8 rounded-xl p-4 text-center">
                <p className="text-2xl sm:text-3xl font-bold mb-1" style={{ fontFamily: GROTESK, color: m.color }}>{m.value}</p>
                <p className="text-[10px] text-[#8A8F98] leading-tight mb-1">{m.label}</p>
                <p className="text-[10px] text-[#8A8F98]/40 leading-tight">{m.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl border border-[#D4AF37]/10 bg-[#D4AF37]/[0.02] text-center">
            <p className="text-xs text-[#8A8F98]">
              <span className="text-white font-semibold">The simple version:</span> with {rides} bookings, raising the average booking to $850 creates{' '}
              <span className="text-[#66FCF1] font-semibold">${fmt(premiumUpside)} more each month</span> before adding a single new booking.
              {' '}SEO can also save an estimated <span className="text-[#D4AF37] font-semibold">${fmt(annualAdSavings)} CAD/year</span> in ad spend.
              {' '}That is how the next Transit Van, and eventually the Edmonton luxury vehicle, can be supported by stronger demand, not more chaos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── ACCEPT MODAL ─────────────────── */
function AcceptModal({ option, onClose }: { option: typeof OPTION_A | typeof OPTION_B; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#111318] border border-[#D4AF37]/20 rounded-2xl p-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#8A8F98] hover:text-white transition-colors">
          <X size={18} />
        </button>

        <div className="text-center">
          <div className="inline-flex p-3 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-5">
            <Shield size={28} className="text-[#D4AF37]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: GROTESK }}>{option.name} Selected</h3>
          <p className="text-sm text-[#8A8F98] mb-6">{option.title}</p>

          <div className="bg-white/[0.03] border border-[#D4AF37]/15 rounded-xl p-5 mb-5">
            <p className="text-4xl font-bold text-[#D4AF37] mb-1" style={{ fontFamily: GROTESK }}>{option.price}</p>
            <p className="text-xs text-[#8A8F98]">{option.priceNote}</p>
            {'monthly' in option && option.monthly && (
              <p className="text-sm text-white mt-2.5">
                + <span className="font-semibold text-[#D4AF37]">{option.monthly}</span>
                <span className="text-[#8A8F98] ml-1.5 text-xs">{(option as typeof OPTION_B).monthlyNote}</span>
              </p>
            )}
          </div>

          <div className="bg-white/[0.02] border border-[#D4AF37]/15 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-2">Payment Terms</p>
            <p className="text-sm text-[#E5E5E5]">50% deposit to initiate the build. 50% on final sign-off and go-live.</p>
            <p className="text-xs text-[#8A8F98] mt-1.5">7-day deployment with zero downtime to your live operations.</p>
          </div>

          <a
            href={`sms:+17808978743?body=${encodeURIComponent(`Hi Nate, I'd like to move forward with ${option.name}: ${option.title}. What are the next steps?`)}`}
            className="block w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B8962F] text-[#0B0C10] font-bold rounded-xl hover:from-[#E5C54B] hover:to-[#D4AF37] transition-all duration-300 text-sm"
          >
            Text Nate to Proceed
          </a>
          <p className="text-[11px] text-[#8A8F98]/40 mt-3">Clicking opens a pre-filled text message with your selected option and a request for next steps.</p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────── MAIN PAGE ─────────────────── */
export default function Proposal() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [acceptOption, setAcceptOption] = useState<typeof OPTION_A | typeof OPTION_B | null>(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    if (!pageRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 22 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen bg-[#0B0C10] text-[#E5E5E5]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Top Nav Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <a href="/" className="text-xs text-[#8A8F98] hover:text-white transition-colors flex items-center gap-1.5">
            <ChevronRight size={13} className="rotate-180" /> Executive Driving
          </a>
          <span className="hidden sm:inline text-[10px] tracking-[0.3em] uppercase text-[#D4AF37]/60 border border-[#D4AF37]/20 px-3 py-1 rounded-full">
            Confidential: Gezim Veliu
          </span>
          <a href="https://wheelersmedia.ca/brands" target="_blank" rel="noopener noreferrer" className="flex items-baseline gap-0 hover:opacity-80 transition-opacity">
            <span className="text-sm font-black text-white tracking-tight" style={{ fontFamily: GROTESK }}>WHEELERS</span>
            <span className="text-sm font-black tracking-tight" style={{ fontFamily: GROTESK, color: '#2563EB' }}>MEDIA</span>
          </a>
        </div>
      </div>

      {/* ══════════ HERO ══════════ */}
      <section className="relative pt-32 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(212,175,55,0.06)_0%,transparent_70%)]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div data-reveal className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.04] mb-9">
            <Shield size={12} className="text-[#D4AF37]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37]/80">
              Confidential Proposal: Prepared exclusively for Gezim Veliu
            </span>
          </div>

          <h1 data-reveal className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white leading-[1.04] tracking-tight mb-6" style={{ fontFamily: GROTESK }}>
            Scaling Executive Driving:
            <br />
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#E5C54B] bg-clip-text text-transparent">
              From 6 Vehicles to Fleet Dominance
            </span>
          </h1>

          <p data-reveal className="text-base sm:text-lg text-[#8A8F98] leading-relaxed max-w-3xl mx-auto mb-10">
            A focused automation and growth system built around the exact pain points you shared,
            eliminating manual client data entry, compounding your Google reputation, and building
            the digital infrastructure your Transit Van expansion and Edmonton luxury fleet will actually need.
          </p>

          {/* Stat bar */}
          <div data-reveal className="inline-flex flex-wrap justify-center gap-6 sm:gap-10 px-8 py-5 rounded-2xl border border-white/8 bg-white/[0.02]">
            {[
              { icon: Truck, value: '5–6 Vehicles', label: 'Active Fleet Today' },
              { icon: Crown, value: 'Rolls / Maybach', label: '2027 Edmonton Vision' },
              { icon: DollarSign, value: '$100/day', label: 'Current Ad Spend' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#D4AF37]/8">
                  <s.icon size={15} className="text-[#D4AF37]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white" style={{ fontFamily: GROTESK }}>{s.value}</p>
                  <p className="text-[10px] text-[#8A8F98]">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div data-reveal className="mt-10 flex items-center justify-center gap-3">
            <span className="text-[11px] text-[#8A8F98]/40 tracking-wider">Architected by</span>
            <a href="https://wheelersmedia.ca/brands" target="_blank" rel="noopener noreferrer"
              className="flex items-baseline gap-0 hover:opacity-80 transition-opacity">
              <span className="text-base font-black text-white tracking-tight leading-none" style={{ fontFamily: GROTESK }}>WHEELERS</span>
              <span className="text-base font-black tracking-tight leading-none" style={{ fontFamily: GROTESK, color: '#2563EB' }}>MEDIA</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ TODAY vs 2027 ══════════ */}
      <StatComparison />

      {/* ══════════ GROWTH TIMELINE ══════════ */}
      <GrowthTimeline />

      {/* ══════════ SYSTEMS ══════════ */}
      <section className="relative py-24 sm:py-28">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#0c0d12] to-[#0B0C10]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-3">What Gets Built</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: GROTESK }}>
              The Wheeler's Media
              <br />
              Executive Driving Operating System
            </h2>
            <p className="text-sm text-[#8A8F98] max-w-xl mx-auto">
              Every system below maps directly to a friction point or growth goal you named on the call.
              No fluff. No AI replacing your personal touch.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SYSTEMS.map(f => (
              <div key={f.title} data-reveal
                className={`relative bg-white/[0.03] border backdrop-blur-md rounded-2xl p-6 sm:p-7 transition-all duration-500 group
                  ${f.tier === 'B'
                    ? 'border-[#66FCF1]/10 hover:border-[#66FCF1]/25'
                    : 'border-white/10 hover:border-[#D4AF37]/25'
                  }`}
              >
                <span
                  className="absolute top-4 right-4 text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full font-semibold"
                  style={f.tier === 'A'
                    ? { color: GOLD, background: `${GOLD}15`, border: `1px solid ${GOLD}25` }
                    : { color: CYAN, background: `${CYAN}10`, border: `1px solid ${CYAN}20` }
                  }
                >
                  {f.tier === 'A' ? 'Option A+B' : 'Option B'}
                </span>
                <div
                  className="p-3 rounded-xl mb-5 inline-flex border"
                  style={f.tier === 'A'
                    ? { background: `${GOLD}0D`, borderColor: `${GOLD}20` }
                    : { background: `${CYAN}0D`, borderColor: `${CYAN}20` }
                  }
                >
                  <f.icon size={20} style={{ color: f.tier === 'A' ? GOLD : CYAN }} />
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2.5 pr-12" style={{ fontFamily: GROTESK }}>{f.title}</h3>
                <p className="text-sm text-[#8A8F98] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>

          <div data-reveal className="mt-8 p-5 rounded-xl border border-white/6 bg-white/[0.02] text-center">
            <p className="text-sm text-[#8A8F98]">
              <span className="text-white font-medium">Personal touch is preserved throughout.</span>{' '}
              No AI responding to your clients. You stay the face of Executive Driving. These systems handle the administrative layer only, so you can focus on the ride.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ ROI CALCULATOR ══════════ */}
      {/* ══════════ PRICING ══════════ */}
      <section className="relative py-24 sm:py-28">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-3">Investment</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: GROTESK }}>Two Paths Forward</h2>
            <p className="text-sm text-[#8A8F98] mt-3 max-w-xl mx-auto">
              Both options are priced to produce a positive return before the GP expansion is complete.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* ── Option A ── */}
            {[OPTION_A, OPTION_B].map(opt => (
              <div
                key={opt.id}
                data-reveal
                className={`relative rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-500 ${
                  opt.tag
                    ? 'border-2 border-[#D4AF37]/35 bg-white/[0.03] shadow-[0_0_70px_rgba(212,175,55,0.07)]'
                    : 'border border-white/10 bg-white/[0.03]'
                }`}
              >
                {opt.tag && <div className="h-1 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37] to-[#D4AF37]/0" />}

                <div className="p-7 sm:p-8">
                  {opt.tag && (
                    <div className="absolute top-5 right-5">
                      <span className="text-[9px] tracking-[0.2em] uppercase bg-[#D4AF37] text-[#0B0C10] px-3 py-1.5 rounded-full font-bold">
                        {opt.tag}
                      </span>
                    </div>
                  )}

                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A8F98] mb-1.5">{opt.name}</p>
                  <h3 className="text-xl font-bold text-white mb-1 pr-24" style={{ fontFamily: GROTESK }}>{opt.title}</h3>
                  <p className="text-xs text-[#8A8F98] mb-6">{opt.subtitle}</p>

                  <div className="mb-1">
                    <span className="text-4xl font-bold text-[#D4AF37]" style={{ fontFamily: GROTESK }}>{opt.price}</span>
                    <span className="text-sm text-[#8A8F98] ml-2">{opt.priceNote}</span>
                  </div>
                  {'monthly' in opt && opt.monthly && (
                    <p className="text-sm text-white mb-6">
                      + <span className="font-semibold text-[#D4AF37]">{opt.monthly}</span>
                      <span className="text-[#8A8F98] text-xs ml-1.5">{(opt as typeof OPTION_B).monthlyNote}</span>
                    </p>
                  )}
                  {!('monthly' in opt && opt.monthly) && <div className="mb-6" />}

                  <ul className="space-y-3 mb-7">
                    {opt.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        {i === 0 && opt.id === 'B'
                          ? <Zap size={14} className="text-[#D4AF37] mt-0.5 shrink-0" />
                          : <Check size={14} className="text-[#D4AF37]/70 mt-0.5 shrink-0" />
                        }
                        <span className={`text-sm ${i === 0 && opt.id === 'B' ? 'text-white font-medium' : 'text-[#8A8F98]'}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className={`rounded-xl p-4 mb-7 ${opt.tag ? 'bg-[#D4AF37]/[0.04] border border-[#D4AF37]/12' : 'bg-white/[0.02] border border-white/8'}`}>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/70 font-semibold mb-2.5">ROI Snapshot</p>
                    <div className="space-y-2">
                      {opt.roi.map((r, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <TrendingUp size={12} className="text-emerald-400/60 mt-0.5 shrink-0" />
                          <span className="text-xs text-[#8A8F98]">
                            <span className="text-white font-semibold">{r.value}</span> {r.label}: {r.note}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setAcceptOption(opt)}
                    className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      opt.tag
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8962F] text-[#0B0C10] hover:from-[#E5C54B] hover:to-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                        : 'border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10'
                    }`}
                  >
                    Accept {opt.name}: {opt.price} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ROICalculator />

      {/* ══════════ NEXT STEPS ══════════ */}
      <section className="relative py-24 sm:py-28">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: GROTESK }}>7 Days. No Downtime.</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-14">
            {[
              { n: '01', icon: Shield, title: '50% Deposit', desc: 'Secures your build slot. Work begins within 24 hours.' },
              { n: '02', icon: Zap, title: 'Build & Deploy', desc: '7-day deployment. Your site stays live the entire time.' },
              { n: '03', icon: ArrowRight, title: 'Handoff & Go Live', desc: 'Walkthrough, training, and priority support activated.' },
            ].map(s => (
              <div key={s.n} data-reveal className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center">
                <div className="inline-flex p-3 rounded-xl bg-[#D4AF37]/8 border border-[#D4AF37]/15 mb-4">
                  <s.icon size={18} className="text-[#D4AF37]" />
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/40 mb-1">Step {s.n}</p>
                <h3 className="text-base font-semibold text-white mb-2" style={{ fontFamily: GROTESK }}>{s.title}</h3>
                <p className="text-xs text-[#8A8F98] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div data-reveal className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <button
              onClick={() => setAcceptOption(OPTION_A)}
              className="px-8 py-4 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] font-semibold hover:bg-[#D4AF37]/10 transition-all duration-300 text-sm"
            >
              Accept Option A: $2,500
            </button>
            <button
              onClick={() => setAcceptOption(OPTION_B)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8962F] text-[#0B0C10] font-bold hover:from-[#E5C54B] hover:to-[#D4AF37] transition-all duration-300 text-sm shadow-lg shadow-[#D4AF37]/10"
            >
              Accept Option B: Full System
            </button>
          </div>

          <div data-reveal className="text-center">
            <p className="text-[11px] text-[#8A8F98]/30 leading-relaxed mb-3">
              This proposal is confidential and prepared exclusively for Gezim Veliu, Executive Driving, Edmonton & Grande Prairie, Alberta.
            </p>
            <a href="https://wheelersmedia.ca/brands" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-baseline gap-0 hover:opacity-70 transition-opacity">
              <span className="text-sm font-black text-white/40 tracking-tight" style={{ fontFamily: GROTESK }}>WHEELERS</span>
              <span className="text-sm font-black tracking-tight" style={{ fontFamily: GROTESK, color: '#2563EB', opacity: 0.6 }}>MEDIA</span>
            </a>
            <p className="text-[10px] text-[#8A8F98]/20 mt-1.5">© {new Date().getFullYear()} Wheeler's Media. All rights reserved.</p>
          </div>
        </div>
      </section>

      {acceptOption && <AcceptModal option={acceptOption} onClose={() => setAcceptOption(null)} />}
    </div>
  )
}
