import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2 } from 'lucide-react'
import { journeySteps } from '../../data/journey'
import { SectionTitle } from '../ui/SectionTitle'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function StudentJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (!containerRef.current) return

    if (prefersReducedMotion) {
      gsap.set(progressLineRef.current, { height: '100%' })
      gsap.set('[data-step-dot]', { backgroundColor: '#2eea53', opacity: 1 })
      gsap.set('[data-step-content]', { opacity: 1, y: 0 })
      return
    }

    const context = gsap.context(() => {
      gsap.set('[data-step-content]', { y: 24 })

      gsap.to(progressLineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          end: 'bottom 75%',
          scrub: 0.6,
        },
      })

      gsap.to(glowRef.current, {
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          end: 'bottom 75%',
          scrub: 0.6,
        },
      })

      const steps = gsap.utils.toArray<HTMLElement>('[data-step]')
      steps.forEach((step) => {
        const dot = step.querySelector('[data-step-dot]')
        const content = step.querySelector('[data-step-content]')

        gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })
          .to(dot, { backgroundColor: '#2eea53', scale: 1.15, duration: 0.3 })
          .to(content, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '<')
      })
    }, containerRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <section className="relative overflow-hidden bg-void py-24 sm:py-28">
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(46,234,83,0.14), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Jornada" title="Do zero ao mercado" />

        <div ref={containerRef} className="relative mt-16 pl-10 sm:pl-14">
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 sm:left-6" />
          <div
            ref={progressLineRef}
            className="absolute left-4 top-0 w-px bg-linear-to-b from-green via-green-bright to-purple sm:left-6"
            style={{ height: prefersReducedMotion ? '100%' : '0%' }}
          />

          <ol className="flex flex-col gap-14">
            {journeySteps.map((step, index) => {
              const isLast = index === journeySteps.length - 1
              return (
                <li key={step.title} data-step className="relative">
                  <span
                    data-step-dot
                    className="absolute -left-10 top-1 flex size-5 items-center justify-center rounded-full bg-card ring-4 ring-void sm:-left-14"
                  >
                    <span className="text-[10px] font-bold text-void">{index + 1}</span>
                  </span>

                  <div data-step-content className="opacity-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-purple-bright">
                      Etapa {index + 1}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-ink sm:text-2xl">{step.title}</h3>
                    <p className="mt-2 max-w-lg text-sm text-muted sm:text-base">{step.description}</p>
                    <code className="mt-4 inline-block rounded-lg border border-white/10 bg-card px-3 py-2 font-mono text-xs text-green/80">
                      {step.code}
                    </code>

                    {isLast && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green/40 bg-green/10 px-4 py-2 text-sm font-semibold text-green">
                        <CheckCircle2 className="size-4" aria-hidden="true" />
                        deployment successful
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
