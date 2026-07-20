import { useLayoutEffect, useRef, type MouseEvent as ReactMouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { CheckCircle2, ShieldCheck, Sparkles, Users } from 'lucide-react'
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
  { text: 'const future = () => you.build();', position: 'right-[30%] top-[12%]', delay: 0, visibility: 'hidden md:block' },
  { text: 'deploy.status = "success";', position: 'right-[5%] top-[16%]', delay: 0.8, visibility: 'hidden md:block' },
  { text: 'while (learning) { grow(); }', position: 'right-[16%] top-[48%]', delay: 1.6, visibility: 'hidden md:block' },
  { text: 'if (code.works) { celebrate(); }', position: 'right-[5%] bottom-[20%]', delay: 2.2, visibility: 'hidden lg:block' },
  { text: 'git push origin future;', position: 'right-[32%] bottom-[15%]', delay: 1.1, visibility: 'hidden lg:block' },
]

const overlayGradient =
  'linear-gradient(90deg, rgba(3,5,8,1) 0%, rgba(3,5,8,0.95) 28%, rgba(3,5,8,0.65) 48%, rgba(3,5,8,0.12) 75%, rgba(3,5,8,0.05) 100%)'

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
      className="relative flex min-h-[clamp(760px,84vh,880px)] items-center overflow-x-hidden bg-void py-24 sm:py-28 lg:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <motion.div style={{ x: layerX, y: layerY }} className="absolute inset-0 scale-110 sm:scale-125 lg:scale-110">
          <img
            src="/img/hero/hero-reference.png"
            alt=""
            className="h-full w-full object-cover opacity-95 mix-blend-screen"
            style={{ objectPosition: '58% 58%' }}
          />
        </motion.div>

        <HeroParticles />

        <div className="pointer-events-none absolute right-[16%] top-[30%] h-[46%] w-[40%] rounded-full bg-green/20 blur-[110px]" />
        <div className="pointer-events-none absolute right-[6%] bottom-[6%] h-[38%] w-[32%] rounded-full bg-purple/15 blur-[110px]" />

        <div className="pointer-events-none absolute inset-0" style={{ background: overlayGradient }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-void to-transparent sm:h-36" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-void to-transparent sm:h-36" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[64%] bg-linear-to-b from-void via-void/65 to-transparent lg:hidden" />

        {floatingCode.map((item) => (
          <span
            key={item.text}
            className={`absolute animate-float rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-green/60 backdrop-blur-sm ${item.visibility} ${item.position}`}
            style={{ animationDelay: `${item.delay}s` }}
          >
            {item.text}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start text-left lg:max-w-[600px]">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted"
          >
            <Sparkles className="size-3.5 text-green" aria-hidden="true" />
            A escola para quem quer virar o jogo
          </motion.span>

          <h1
            ref={headlineRef}
            className="mt-5 font-display text-3xl font-extrabold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl"
          >
            {headlineLines.map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden py-1">
                {line.words.map((word) => (
                  <span
                    key={word}
                    data-word
                    className={`mr-2 inline-block last:mr-0 sm:mr-3 ${line.highlight ? 'text-green' : 'text-ink'}`}
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
            className="mt-6 max-w-md text-balance text-base text-muted sm:text-lg"
          >
            Do zero ao avançado com projetos reais, mentoria de especialistas e uma comunidade que impulsiona sua
            carreira na tecnologia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center lg:w-auto lg:justify-start"
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
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {indicators.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-muted">
                <Icon className="size-4 text-green" aria-hidden="true" />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
