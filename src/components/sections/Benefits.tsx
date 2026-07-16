import { motion, type Variants } from 'framer-motion'
import { benefits } from '../../data/benefits'
import { GlowCard } from '../ui/GlowCard'
import { SectionTitle } from '../ui/SectionTitle'

const entranceVariants: Variants[] = [
  { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
  { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
]

export function Benefits() {
  return (
    <section className="relative bg-void py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Benefícios"
          title="Tudo que você precisa para evoluir de verdade"
          description="Um ecossistema completo para transformar aprendizado em resultado real de carreira."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            const variant = entranceVariants[index % entranceVariants.length]
            return (
              <motion.div
                key={benefit.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: 'easeOut' }}
                variants={variant}
                className={index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}
              >
                <GlowCard accent={benefit.accent} className="h-full p-7">
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl ${
                      benefit.accent === 'green' ? 'bg-green/10 text-green' : 'bg-purple/10 text-purple-bright'
                    }`}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted">{benefit.description}</p>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
