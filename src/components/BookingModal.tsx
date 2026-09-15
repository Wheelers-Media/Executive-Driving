import { useState, useEffect } from 'react'
import { X, Plane, Briefcase, Clock as ClockIcon, MapPin, Calendar, Users, Car, ArrowRight, ArrowLeft, CheckCircle, User, Phone, Mail, ChevronDown } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const SERVICE_TYPES = [
  { id: 'airport', label: 'Airport Transfer', icon: Plane, desc: 'YEG & YQU pickups and drop-offs' },
  { id: 'corporate', label: 'Corporate Chauffeur', icon: Briefcase, desc: 'Point-to-point executive transport' },
  { id: 'hourly', label: 'Hourly Charter', icon: ClockIcon, desc: 'Multi-stop or standby service' },
]

const LOCATIONS: Record<string, string[]> = {
  pickup: [
    'Edmonton International Airport (YEG)',
    'Grande Prairie Airport (YQU)',
    'Downtown Edmonton',
    'Downtown Grande Prairie',
    'West Edmonton Mall',
  ],
  dropoff: [
    'Edmonton International Airport (YEG)',
    'Grande Prairie Airport (YQU)',
    'Downtown Edmonton',
    'Downtown Grande Prairie',
    'Leduc',
    'Energy Sector Sites',
  ],
}

function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let suffix = ''
  for (let i = 0; i < 4; i++) suffix += chars[Math.floor(Math.random() * chars.length)]
  return `EXEC-2026-${suffix}`
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [confirmed, setConfirmed] = useState(false)
  const [refCode, setRefCode] = useState('')

  const [service, setService] = useState('airport')
  const [tripType, setTripType] = useState<'oneway' | 'return'>('oneway')
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [showPickup, setShowPickup] = useState(false)
  const [showDropoff, setShowDropoff] = useState(false)

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [passengers, setPassengers] = useState('1')
  const [vehicle, setVehicle] = useState('navigator')
  const [vipAmenities, setVipAmenities] = useState(false)

  const [showPassengers, setShowPassengers] = useState(false)
  const [showVehicle, setShowVehicle] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1)
        setConfirmed(false)
        setRefCode('')
      }, 300)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const today = new Date().toISOString().split('T')[0]

  const canAdvance = () => {
    if (step === 1) return service && pickup && dropoff
    if (step === 2) return date && time && passengers && vehicle
    if (step === 3) return name && phone && email
    return false
  }

  const handleSubmit = () => {
    setRefCode(generateRef())
    setConfirmed(true)
  }

  const vehicleLabels: Record<string, string> = {
    navigator: 'Lincoln Navigator L',
    denali: 'GMC Denali',
    transit: 'Ford Transit AWD',
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto glass-panel rounded-2xl animate-fade-up">
        <div className="h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg text-platinum-dim hover:text-platinum hover:bg-white/5 transition-colors"
        >
          <X size={18} />
        </button>

        {!confirmed ? (
          <div className="p-6 sm:p-8">
            {/* Progress */}
            <div className="flex items-center gap-3 mb-8">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 shrink-0 ${
                    s < step ? 'bg-gold text-obsidian-deep' :
                    s === step ? 'bg-gold/20 text-gold border border-gold/40' :
                    'bg-white/5 text-platinum-dim border border-white/10'
                  }`}>
                    {s < step ? <CheckCircle size={14} /> : s}
                  </div>
                  {s < 3 && <div className={`h-px flex-1 transition-colors duration-300 ${s < step ? 'bg-gold/40' : 'bg-white/8'}`} />}
                </div>
              ))}
            </div>

            {/* Step 1: Route */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <p className="section-tag mb-1">Step 1</p>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Select Your Service</h3>
                </div>

                <div className="flex rounded-xl border border-white/10 overflow-hidden mb-1">
                  {(['oneway', 'return'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTripType(t)}
                      className={`flex-1 py-2.5 text-sm font-medium transition-all duration-200 ${
                        tripType === t
                          ? 'bg-gold/15 text-gold border-gold/30'
                          : 'bg-white/[0.02] text-platinum-dim hover:text-platinum'
                      }`}
                    >
                      {t === 'oneway' ? 'One Way' : 'Return Trip'}
                    </button>
                  ))}
                </div>

                <div className="grid gap-2.5">
                  {SERVICE_TYPES.map(st => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setService(st.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                        service === st.id
                          ? 'border-gold/40 bg-gold/8'
                          : 'border-white/8 bg-white/[0.02] hover:border-white/15'
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg ${service === st.id ? 'bg-gold/15' : 'bg-white/5'}`}>
                        <st.icon size={18} className={service === st.id ? 'text-gold' : 'text-platinum-dim'} />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${service === st.id ? 'text-white' : 'text-platinum'}`}>{st.label}</p>
                        <p className="text-xs text-platinum-dim">{st.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70" />
                  <input
                    type="text"
                    placeholder="Pickup location"
                    value={pickup}
                    onChange={e => setPickup(e.target.value)}
                    onFocus={() => setShowPickup(true)}
                    onBlur={() => setTimeout(() => setShowPickup(false), 200)}
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-platinum placeholder:text-platinum-dim/50 focus:border-gold/30 focus:outline-none transition-colors"
                    required
                  />
                  {showPickup && (
                    <div className="absolute top-full left-0 right-0 mt-1 glass-panel rounded-xl overflow-hidden z-20">
                      {LOCATIONS.pickup.map(loc => (
                        <button key={loc} type="button" onMouseDown={() => { setPickup(loc); setShowPickup(false) }}
                          className="block w-full text-left px-4 py-2.5 text-sm text-platinum-dim hover:bg-gold/8 hover:text-gold transition-colors">
                          {loc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Plane size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70" />
                  <input
                    type="text"
                    placeholder="Drop-off location"
                    value={dropoff}
                    onChange={e => setDropoff(e.target.value)}
                    onFocus={() => setShowDropoff(true)}
                    onBlur={() => setTimeout(() => setShowDropoff(false), 200)}
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-platinum placeholder:text-platinum-dim/50 focus:border-gold/30 focus:outline-none transition-colors"
                    required
                  />
                  {showDropoff && (
                    <div className="absolute top-full left-0 right-0 mt-1 glass-panel rounded-xl overflow-hidden z-20">
                      {LOCATIONS.dropoff.map(loc => (
                        <button key={loc} type="button" onMouseDown={() => { setDropoff(loc); setShowDropoff(false) }}
                          className="block w-full text-left px-4 py-2.5 text-sm text-platinum-dim hover:bg-gold/8 hover:text-gold transition-colors">
                          {loc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <p className="section-tag mb-1">Step 2</p>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Trip Details</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70" />
                    <input type="date" min={today} value={date} onChange={e => setDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-platinum focus:border-gold/30 focus:outline-none transition-colors [color-scheme:dark]" required />
                  </div>
                  <div className="relative">
                    <ClockIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70" />
                    <input type="time" value={time} onChange={e => setTime(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-platinum focus:border-gold/30 focus:outline-none transition-colors [color-scheme:dark]" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Passengers dropdown */}
                  <div className="relative">
                    <Users size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70 z-[1]" />
                    <button
                      type="button"
                      onClick={() => { setShowPassengers(!showPassengers); setShowVehicle(false) }}
                      onBlur={() => setTimeout(() => setShowPassengers(false), 150)}
                      className="w-full pl-10 pr-8 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-platinum text-left focus:border-gold/30 focus:outline-none transition-colors"
                    >
                      {passengers} {Number(passengers) === 1 ? 'Passenger' : 'Passengers'}
                      <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 text-platinum-dim transition-transform duration-200 ${showPassengers ? 'rotate-180' : ''}`} />
                    </button>
                    {showPassengers && (
                      <div className="absolute top-full left-0 right-0 mt-1 glass-panel rounded-xl overflow-hidden z-30 max-h-52 overflow-y-auto">
                        {Array.from({ length: 14 }, (_, i) => i + 1).map(n => (
                          <button key={n} type="button"
                            onMouseDown={() => { setPassengers(String(n)); setShowPassengers(false) }}
                            className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                              String(n) === passengers ? 'bg-gold/15 text-gold' : 'text-platinum-dim hover:bg-gold/8 hover:text-gold'
                            }`}>
                            {n} {n === 1 ? 'Passenger' : 'Passengers'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Vehicle dropdown */}
                  <div className="relative">
                    <Car size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70 z-[1]" />
                    <button
                      type="button"
                      onClick={() => { setShowVehicle(!showVehicle); setShowPassengers(false) }}
                      onBlur={() => setTimeout(() => setShowVehicle(false), 150)}
                      className="w-full pl-10 pr-8 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-platinum text-left focus:border-gold/30 focus:outline-none transition-colors truncate"
                    >
                      {vehicleLabels[vehicle]}
                      <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 text-platinum-dim transition-transform duration-200 ${showVehicle ? 'rotate-180' : ''}`} />
                    </button>
                    {showVehicle && (
                      <div className="absolute top-full left-0 right-0 mt-1 glass-panel rounded-xl overflow-hidden z-30">
                        {Object.entries(vehicleLabels).map(([key, label]) => (
                          <button key={key} type="button"
                            onMouseDown={() => { setVehicle(key); setShowVehicle(false) }}
                            className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                              key === vehicle ? 'bg-gold/15 text-gold' : 'text-platinum-dim hover:bg-gold/8 hover:text-gold'
                            }`}>
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] cursor-pointer hover:border-gold/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={vipAmenities}
                    onChange={e => setVipAmenities(e.target.checked)}
                    className="mt-0.5 accent-[#D4AF37] w-4 h-4 shrink-0"
                  />
                  <div>
                    <p className="text-sm text-platinum font-medium">Add VIP Amenities & Executive Refreshment Package</p>
                    <p className="text-xs text-platinum-dim mt-1">Includes complimentary bottled mineral water, Wi-Fi, and custom beverage setup.</p>
                  </div>
                </label>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/8">
                  <p className="text-xs text-platinum-dim mb-1">Route</p>
                  <p className="text-sm text-platinum font-medium">{pickup} <span className="text-gold mx-1.5">{tripType === 'return' ? '⇄' : '→'}</span> {dropoff}</p>
                </div>
              </div>
            )}

            {/* Step 3: Passenger */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <p className="section-tag mb-1">Step 3</p>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Passenger Details</h3>
                </div>

                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70" />
                  <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-platinum placeholder:text-platinum-dim/50 focus:border-gold/30 focus:outline-none transition-colors" required />
                </div>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70" />
                  <input type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-platinum placeholder:text-platinum-dim/50 focus:border-gold/30 focus:outline-none transition-colors" required />
                </div>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70" />
                  <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-platinum placeholder:text-platinum-dim/50 focus:border-gold/30 focus:outline-none transition-colors" required />
                </div>

                {/* Summary */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/8 space-y-2">
                  <p className="text-xs text-platinum-dim uppercase tracking-wider font-semibold mb-2">Booking Summary</p>
                  {[
                    ['Service', SERVICE_TYPES.find(s => s.id === service)?.label || ''],
                    ['Trip Type', tripType === 'return' ? 'Return Trip' : 'One Way'],
                    ['Route', `${pickup} ${tripType === 'return' ? '⇄' : '→'} ${dropoff}`],
                    ['Date & Time', `${date} at ${time}`],
                    ['Vehicle', vehicleLabels[vehicle]],
                    ['Passengers', passengers],
                    ...(vipAmenities ? [['VIP Amenities', 'Executive Refreshment Package']] : []),
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="text-platinum-dim">{k}</span>
                      <span className="text-platinum font-medium text-right max-w-[55%] truncate">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-8">
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-sm text-platinum-dim hover:text-platinum hover:border-white/20 transition-colors">
                  <ArrowLeft size={16} /> Back
                </button>
              )}
              <button
                onClick={() => step < 3 ? setStep(s => s + 1) : handleSubmit()}
                disabled={!canAdvance()}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-obsidian-deep text-sm font-semibold hover:from-gold-light hover:to-gold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                {step < 3 ? 'Continue' : 'Confirm Priority Dispatch Request'}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <p className="text-center text-[11px] text-platinum-dim/40 mt-4">
              Free cancellation up to 24 hours prior &middot; No surge pricing
            </p>
          </div>
        ) : (
          /* Confirmation */
          <div className="p-6 sm:p-8 text-center">
            <div className="inline-flex p-4 rounded-full bg-gold/10 border border-gold/20 mb-5">
              <CheckCircle size={32} className="text-gold" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Priority Chauffeur Dispatched</h3>
            <p className="text-sm text-platinum-dim mb-6">Your reservation is confirmed and a chauffeur has been assigned.</p>

            <div className="inline-block px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 mb-6">
              <p className="text-[10px] text-platinum-dim uppercase tracking-widest mb-1">Reference Code</p>
              <p className="text-xl font-mono font-bold text-gold tracking-wider">{refCode}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/8 text-left space-y-2 mb-6">
              {[
                ['Passenger', name],
                ['Trip Type', tripType === 'return' ? 'Return Trip' : 'One Way'],
                ['Route', `${pickup} ${tripType === 'return' ? '⇄' : '→'} ${dropoff}`],
                ['Date & Time', `${date} at ${time}`],
                ['Vehicle', vehicleLabels[vehicle]],
                ...(vipAmenities ? [['VIP Amenities', 'Included']] : []),
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-platinum-dim">{k}</span>
                  <span className="text-platinum font-medium text-right max-w-[55%] truncate">{v}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-platinum-dim/60 mb-6">
              A confirmation will be sent to {email || 'your email'}. Your chauffeur will arrive 15 minutes prior to pickup.
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-obsidian-deep text-sm font-semibold hover:from-gold-light hover:to-gold transition-all duration-300"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
