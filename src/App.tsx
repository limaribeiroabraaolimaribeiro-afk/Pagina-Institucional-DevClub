import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { SocialProof } from './components/sections/SocialProof'
import { Courses } from './components/sections/Courses'
import { Technologies } from './components/sections/Technologies'
import { Benefits } from './components/sections/Benefits'
import { StudentJourney } from './components/sections/StudentJourney'
import { PlatformPreview } from './components/sections/PlatformPreview'
import { Projects } from './components/sections/Projects'
import { Testimonials } from './components/sections/Testimonials'
import { Tutors } from './components/sections/Tutors'
import { Numbers } from './components/sections/Numbers'
import { FAQ } from './components/sections/FAQ'
import { FinalCTA } from './components/sections/FinalCTA'
import { CursorGlow } from './components/effects/CursorGlow'
import { useReducedMotion } from './hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })

    function syncLenis(time: number) {
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(syncLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(syncLenis)
    }
  }, [prefersReducedMotion])

  return (
    <>
      <CursorGlow />
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Courses />
        <Technologies />
        <Benefits />
        <StudentJourney />
        <PlatformPreview />
        <Projects />
        <Testimonials />
        <Tutors />
        <Numbers />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
