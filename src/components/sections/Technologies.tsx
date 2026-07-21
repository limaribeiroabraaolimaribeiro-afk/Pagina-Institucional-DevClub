import { useState } from 'react'
import { motion } from 'framer-motion'
import { technologies, type TechCategory } from '../../data/technologies'
import { TechIcon } from '../ui/TechIcon'
import { Button } from '../ui/Button'
import { AnimatedGrid } from '../effects/AnimatedGrid'

const categoryBorder: Record<TechCategory, string> = {
  frontend: 'hover:border-green/50',
  backend: 'hover:border-purple/50',
  cloud: 'hover:border-purple-bright/50',
  data: 'hover:border-green-bright/50',
  ai: 'hover:border-purple/50',
}

const categoryGlow: Record<TechCategory, string> = {
  frontend: 'hover:shadow-[0_0_20px_-6px_rgba(46,234,83,0.45)]',
  backend: 'hover:shadow-[0_0_20px_-6px_rgba(139,61,255,0.45)]',
  cloud: 'hover:shadow-[0_0_20px_-6px_rgba(180,92,255,0.4)]',
  data: 'hover:shadow-[0_0_20px_-6px_rgba(57,255,90,0.4)]',
  ai: 'hover:shadow-[0_0_20px_-6px_rgba(139,61,255,0.45)]',
}

const INITIAL_COUNT = 16

export function Technologies() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? technologies : technologies.slice(0, INITIAL_COUNT)

  return (
    <section className="relative overflow-hidden bg-surface py-14 sm:py-16 lg:flex lg:min-h-[460px] lg:items-center lg:py-14">
      <AnimatedGrid accent="purple" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 size-[380px] -translate-y-1/2 rounded-full bg-green/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 size-[380px] -translate-y-1/2 rounded-full bg-purple/8 blur-[110px]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[30fr_70fr] lg:items-center lg:gap-12 lg:px-8">
        <div className="flex flex-col items-start text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="rounded-full border border-purple/30 bg-purple/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-purple-bright"
          >
            Tecnologias
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 text-balance font-display text-3xl font-bold leading-tight sm:text-4xl"
          >
            Aprenda as <span className="text-green">principais tecnologias</span> do mercado
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-balance text-base text-muted"
          >
            Do básico ao avançado, com projetos reais, métodos práticos e uma linguagem simples.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6"
          >
            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={() => setShowAll((value) => !value)}
              aria-expanded={showAll}
            >
              {showAll ? 'Mostrar menos' : 'Ver todas as tecnologias'}
            </Button>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-2.5 lg:gap-3">
          {visible.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: (index % 12) * 0.03 }}
              className={`group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-card px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 ${categoryBorder[tech.category]} ${categoryGlow[tech.category]} ${tech.drift ? 'animate-chip-drift' : ''}`}
            >
              <TechIcon
                path={tech.path}
                monogram={tech.monogram}
                hex={tech.hex}
                className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-125"
              />
              <span className="whitespace-nowrap text-xs font-medium text-ink sm:text-sm">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
