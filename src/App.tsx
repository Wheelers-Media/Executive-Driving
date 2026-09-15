import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import FleetShowcase from './components/FleetShowcase'
import ValueProposition from './components/ValueProposition'
import Partners from './components/Partners'
import Testimonials from './components/Testimonials'
import BookingModal from './components/BookingModal'
import Footer from './components/Footer'
import Proposal from './pages/Proposal'

gsap.registerPlugin(ScrollTrigger)

function MainSite() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      const raf = (time: number) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.lagSmoothing(0)
      gsap.ticker.fps(60)

      return () => { lenis.destroy() }
    })

    return () => { mm.revert() }
  }, [])

  useEffect(() => {
    if (!mainRef.current) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-animate]').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach(container => {
        const children = container.querySelectorAll('[data-stagger-item]')
        if (!children.length) return
        gsap.fromTo(children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, mainRef)

    return () => { ctx.revert() }
  }, [])

  return (
    <div ref={mainRef} className="min-h-screen bg-obsidian-deep">
      <Navigation onBookNow={() => setBookingOpen(true)} />
      <Hero onBookNow={() => setBookingOpen(true)} />

      <div data-animate>
        <Partners />
      </div>

      <div data-animate>
        <FleetShowcase onBookNow={() => setBookingOpen(true)} />
      </div>

      <div data-animate>
        <ValueProposition />
      </div>

      <div data-animate>
        <Testimonials />
      </div>

      <div data-animate>
        <Footer onBookNow={() => setBookingOpen(true)} />
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/proposal" element={<Proposal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
