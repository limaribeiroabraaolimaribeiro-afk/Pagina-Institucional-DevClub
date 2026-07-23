import { useRef, type MouseEvent as ReactMouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { SectionTitle } from '../ui/SectionTitle'
import { ProjectPreview } from '../ui/ProjectPreview'
import { ProjectsParticles } from '../effects/ProjectsParticles'
import { ProjectsEnergyLines } from '../effects/ProjectsEnergyLines'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const sceneMaskStyle = {
  WebkitMaskImage: 'radial-gradient(ellipse 94% 90% at 50% 50%, black 66%, transparent 100%)',
  maskImage: 'radial-gradient(ellipse 94% 90% at 50% 50%, black 66%, transparent 100%)',
}

export function Projects() {
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTabletUp = useMediaQuery('(min-width: 640px)')
  const tier: 'desktop' | 'tablet' | 'mobile' = isDesktop ? 'desktop' : isTabletUp ? 'tablet' : 'mobile'

  const sceneRef = useRef<HTMLDivElement>(null)

  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const mvRotX = useMotionValue(0)
  const mvRotY = useMotionValue(0)
  const springConfig = { stiffness: 70, damping: 18, mass: 0.5 }
  const x = useSpring(mvX, springConfig)
  const y = useSpring(mvY, springConfig)
  const rotX = useSpring(mvRotX, springConfig)
  const rotY = useSpring(mvRotY, springConfig)
  const backX = useTransform(x, (value) => value * 0.4)
  const backY = useTransform(y, (value) => value * 0.4)

  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start end', 'end start'] })
  const scrollShift = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-10, 10])
  const scrollShiftSpring = useSpring(scrollShift, { stiffness: 60, damping: 20, mass: 0.5 })

  function handleMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || tier === 'mobile') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const relX = (event.clientX - bounds.left) / bounds.width - 0.5
    const relY = (event.clientY - bounds.top) / bounds.height - 0.5
    const parallaxMax = tier === 'desktop' ? 14 : 8
    const rotateMax = tier === 'desktop' ? 3 : 1.5
    mvX.set(relX * parallaxMax * 2)
    mvY.set(relY * parallaxMax * 2)
    mvRotY.set(relX * rotateMax * 2)
    mvRotX.set(-relY * rotateMax * 2)
  }

  function handleMouseLeave() {
    mvX.set(0)
    mvY.set(0)
    mvRotX.set(0)
    mvRotY.set(0)
  }

  return (
    <section className="relative overflow-x-hidden bg-void py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Portfólio"
          title="Projetos práticos que constroem seu portfólio"
          description="Aplicações completas para você aprender fazendo, do primeiro commit ao deploy."
        />

        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto mt-12 sm:mt-14 lg:mt-16"
        >
          <motion.div
            ref={sceneRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ y: scrollShiftSpring, perspective: '1400px' }}
            className="relative mx-auto w-full sm:w-[92%] lg:w-[84%]"
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -left-[8%] top-[4%] h-[55%] w-[46%] rounded-full bg-green/25 blur-[100px]"
              animate={prefersReducedMotion ? undefined : { opacity: [0.35, 0.55, 0.35] }}
              transition={prefersReducedMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={prefersReducedMotion ? { opacity: 0.32 } : undefined}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-[6%] bottom-[2%] h-[50%] w-[42%] rounded-full bg-purple/25 blur-[100px]"
              animate={prefersReducedMotion ? undefined : { opacity: [0.3, 0.5, 0.3] }}
              transition={
                prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }
              }
              style={prefersReducedMotion ? { opacity: 0.28 } : undefined}
            />

            <div className="pointer-events-none absolute inset-0">
              <ProjectsEnergyLines />
            </div>

            <motion.div
              aria-hidden="true"
              style={{ x: backX, y: backY }}
              className="pointer-events-none absolute inset-0 scale-105 overflow-hidden rounded-[28px] opacity-40 blur-2xl"
            >
              <img src="/img/hero/hero-projetos.png" alt="" className="h-full w-full object-cover" />
            </motion.div>

            <motion.div style={{ x, y, rotateX: rotX, rotateY: rotY }} className="relative">
              <motion.div
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.025, 1] }}
                transition={
                  prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
                }
                className="relative aspect-video w-full overflow-hidden rounded-[28px] ring-1 ring-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)]"
              >
                <img
                  src="/img/hero/hero-projetos.png"
                  alt="Ilustração de painéis de aplicações — e-commerce, streaming, dashboard, API, chatbot com IA e sistema financeiro — orbitando um núcleo de código, representando os projetos práticos do portfólio DevClub."
                  className="h-full w-full object-cover"
                  style={sceneMaskStyle}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 55%, rgba(3,5,8,0.9) 100%)',
                  }}
                />
              </motion.div>
            </motion.div>

            <div className="pointer-events-none absolute -inset-6 z-10 sm:-inset-10">
              <ProjectsParticles />
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-14 sm:mt-16">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">Mais projetos</p>
          <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {projects.map((project, index) => (
              <motion.li
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                className="group w-[210px] shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-green/30 sm:w-[230px]"
              >
                <div className="h-24 w-full overflow-hidden sm:h-28">
                  <ProjectPreview type={project.preview} accent={project.accent} />
                </div>
                <div className="flex flex-col gap-1.5 p-3.5">
                  <h3 className="truncate text-sm font-semibold text-ink">{project.name}</h3>
                  <div className="flex flex-wrap gap-1">
                    {project.stack.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 px-1.5 py-0.5 text-[10px] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="mt-1 inline-flex w-fit items-center gap-1 rounded-full text-xs font-semibold text-green transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green group-hover:gap-1.5"
                  >
                    Ver projeto
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                  </a>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
