import { motion } from 'framer-motion'
import { benefits } from '../../data/benefits'
import { GlowCard } from '../ui/GlowCard'
import { SectionTitle } from '../ui/SectionTitle'

export function Benefits() {
  return (
    <section className="relative bg-void py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Benefícios"
          title="Tudo que você precisa para evoluir de verdade"
          description="Um ecossistema completo para transformar aprendizado em resultado real de carreira."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-4 overflow-x-clip sm:mt-10">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
                className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(20%-13px)]"
              >
                <GlowCard accent={benefit.accent} tilt={false} className="h-full p-5 transition-transform duration-300 hover:-translate-y-1">
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg ${
                      benefit.accent === 'green' ? 'bg-green/10 text-green' : 'bg-purple/10 text-purple-bright'
                    }`}
                  >
                    <Icon
                      className="size-5 transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-ink">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-snug text-muted">{benefit.description}</p>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
