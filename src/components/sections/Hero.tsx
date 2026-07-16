import { useLayoutEffect, useRef, type MouseEvent as ReactMouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { CheckCircle2, ShieldCheck, Users } from 'lucide-react'
import { HeroParticles } from '../effects/HeroParticles'
import { Button } from '../ui/Button'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const headlineLines = [
  { words: ['SEU', 'CÓDIGO'], highlight: false },
  { words: ['PODE', 'MUDAR'], highlight: false },
  { words: ['O', 'SEU', 'FUTURO.'], highlight: true },
]

const indicators = [
  { icon: CheckCircle2, label: 'Acesso imediato' },
  { icon: ShieldCheck, label: '7 dias de garantia' },
  { icon: Users, label: 'Comunidade ativa' },
]

const floatingCode = [
  { text: 'const future = () => you.build();', position: 'left-2 top-[22%] sm:left-6', delay: 0 },
  { text: 'while (learning) { grow(); }', position: 'left-2 top-[68%] sm:left-10', delay: 1.4 },
  { text: 'deploy.status = "success";', position: 'right-2 top-[30%] sm:right-6', delay: 0.7 },
  { text: 'if (code.works) { celebrate(); }', position: 'right-2 top-[74%] sm:right-10', delay: 2.1 },
]

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 60, damping: 20, mass: 0.6 }
  const layerX = useSpring(mouseX, springConfig)
  const layerY = useSpring(mouseY, springConfig)

  useLayoutEffect(() => {
    if (!headlineRef.current || prefersReducedMotion) return

    const words = headlineRef.current.querySelectorAll('[data-word]')
    const context = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.06,
          delay: 0.2,
        },
      )
    }, headlineRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  function handleMouseMove(event: ReactMouseEvent<HTMLElement>) {
    if (prefersReducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const relX = (event.clientX - bounds.left) / bounds.width - 0.5
    const relY = (event.clientY - bounds.top) / bounds.height - 0.5
    mouseX.set(relX * 24)
    mouseY.set(relY * 24)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen items-center overflow-hidden bg-void pt-28 pb-20 sm:pt-32"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <HeroParticles />

        <motion.div
          style={{ x: layerX, y: layerY }}
          className="absolute left-1/2 top-1/2 h-[130%] w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 sm:h-[160%] sm:w-[110%]"
        >
          <img
            src="/img/hero/hero-reference.png"
            alt=""
            className="h-full w-full object-contain opacity-70 mix-blend-screen sm:opacity-80"
          />
        </motion.div>

        <div className="absolute inset-0 bg-linear-to-b from-void via-transparent to-void" />
        <div className="absolute inset-0 bg-linear-to-r from-void via-transparent to-void/60" />

        {floatingCode.map((item) => (
          <span
            key={item.text}
            className={`absolute hidden animate-float rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-green/70 backdrop-blur-sm lg:block ${item.position}`}
            style={{ animationDelay: `${item.delay}s` }}
          >
            {item.text}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <h1
          ref={headlineRef}
          className="font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {headlineLines.map((line, lineIndex) => (
            <span key={lineIndex} className="block overflow-hidden py-1">
              {line.words.map((word) => (
                <span
                  key={word}
                  data-word
                  className={`mx-2 inline-block first:ml-0 ${line.highlight ? 'text-green' : 'text-ink'}`}
                  style={line.highlight ? { textShadow: '0 0 40px rgba(46,234,83,0.45)' } : undefined}
                >
                  {word}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-6 max-w-2xl text-balance text-base text-muted sm:text-lg"
        >
          Do zero ao avançado com projetos reais, mentoria de especialistas e uma comunidade que impulsiona sua
          carreira na tecnologia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button href="#quero-ser-aluno" variant="primary" size="lg" showArrow>
            Quero ser aluno
          </Button>
          <Button href="#formacoes" variant="secondary" size="lg">
            Ver formações
          </Button>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {indicators.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm text-muted">
              <Icon className="size-4 text-green" aria-hidden="true" />
              {label}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
