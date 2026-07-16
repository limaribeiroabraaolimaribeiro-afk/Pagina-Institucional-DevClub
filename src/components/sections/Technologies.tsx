import { motion } from 'framer-motion'
import { technologies, type ChipSize } from '../../data/technologies'
import { SectionTitle } from '../ui/SectionTitle'
import { AnimatedGrid } from '../effects/AnimatedGrid'

const sizeClasses: Record<ChipSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base font-semibold',
}

export function Technologies() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-28">
      <AnimatedGrid accent="purple" />

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

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {technologies.map((tech, index) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
              whileHover={{ scale: 1.06 }}
              className={`rounded-full border border-white/10 bg-card text-ink transition-colors duration-300 hover:border-green/50 hover:text-green hover:shadow-[0_0_24px_-6px_rgba(46,234,83,0.5)] ${sizeClasses[tech.size]}`}
            >
              {tech.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
