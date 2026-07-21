import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { technologies, featuredTechnologies, type ChipSize, type TechCategory } from '../../data/technologies'
import { SectionTitle } from '../ui/SectionTitle'
import { GlowCard } from '../ui/GlowCard'
import { Button } from '../ui/Button'
import { AnimatedGrid } from '../effects/AnimatedGrid'

const sizeClasses: Record<ChipSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base font-semibold',
}

const categoryMeta: Record<
  TechCategory,
  { dot: string; iconBg: string; iconColor: string; glowAccent: 'green' | 'purple' }
> = {
  frontend: { dot: 'bg-green', iconBg: 'bg-green/10', iconColor: 'text-green', glowAccent: 'green' },
  backend: { dot: 'bg-purple', iconBg: 'bg-purple/10', iconColor: 'text-purple-bright', glowAccent: 'purple' },
  cloud: {
    dot: 'bg-purple-bright',
    iconBg: 'bg-purple-bright/10',
    iconColor: 'text-purple-bright',
    glowAccent: 'purple',
  },
  data: { dot: 'bg-green-bright', iconBg: 'bg-green-bright/10', iconColor: 'text-green-bright', glowAccent: 'green' },
  ai: {
    dot: 'bg-linear-to-r from-green to-purple',
    iconBg: 'bg-linear-to-br from-green/15 to-purple/15',
    iconColor: 'text-green',
    glowAccent: 'purple',
  },
}

const VISIBLE_CHIP_COUNT = 10

export function Technologies() {
  const [showAllChips, setShowAllChips] = useState(false)
  const visibleChips = showAllChips ? technologies : technologies.slice(0, VISIBLE_CHIP_COUNT)

  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-24">
      <AnimatedGrid accent="purple" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 size-[420px] rounded-full bg-green/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-[420px] rounded-full bg-purple/12 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Stack"
          title={
            <>
              As tecnologias que <span className="text-green">o mercado</span> mais pede
            </>
          }
          description="Ferramentas reais, usadas por empresas de tecnologia todos os dias."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {featuredTechnologies.map((tech, index) => {
            const Icon = tech.icon
            const meta = categoryMeta[tech.category]
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={tech.span === 2 ? 'sm:col-span-3 lg:col-span-2' : ''}
              >
                <GlowCard
                  accent={meta.glowAccent}
                  tilt={false}
                  className="h-full p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex size-12 items-center justify-center rounded-xl ${meta.iconBg}`}>
                      <Icon
                        className={`size-6 transition-transform duration-300 group-hover:scale-110 ${meta.iconColor}`}
                        aria-hidden="true"
                      />
                    </div>
                    <span className={`size-2 rounded-full ${meta.dot}`} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink sm:text-xl">{tech.name}</h3>
                  <p className="mt-1.5 text-sm text-muted">{tech.description}</p>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {visibleChips.map((tech, index) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
              whileHover={{ scale: 1.06 }}
              className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-card text-ink transition-colors duration-300 hover:border-green/50 hover:text-green hover:shadow-[0_0_24px_-6px_rgba(46,234,83,0.5)] ${sizeClasses[tech.size]}`}
            >
              <span className={`size-1.5 rounded-full ${categoryMeta[tech.category].dot}`} aria-hidden="true" />
              {tech.name}
            </motion.span>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setShowAllChips((value) => !value)}
            aria-expanded={showAllChips}
          >
            {showAllChips ? 'Mostrar menos' : 'Ver todas as tecnologias'}
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${showAllChips ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </section>
  )
}
