import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { statItems } from '../../data/numbers'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { AnimatedGrid } from '../effects/AnimatedGrid'

export function Numbers() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-28">
      <AnimatedGrid accent="green" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <p className="font-display text-4xl font-extrabold text-green sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="max-w-[10rem] text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-3 border-t border-white/10 pt-10 text-center"
        >
          <Award className="size-8 text-purple-bright" aria-hidden="true" />
          <p className="text-lg font-semibold text-ink">Certificado reconhecido pelo mercado</p>
        </motion.div>
      </div>
    </section>
  )
}
