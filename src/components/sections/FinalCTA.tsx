import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { assetUrl } from '../../lib/assetUrl'

export function FinalCTA() {
  return (
    <section
      id="quero-ser-aluno"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 30%, #1a0b3d 0%, #030508 75%)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 100%, rgba(46,234,83,0.16), transparent 60%)' }}
      />

      <motion.img
        src={assetUrl('/img/cta/final-cta.png')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.85, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute left-1/2 top-10 w-[min(560px,90%)] -translate-x-1/2 object-contain mix-blend-screen sm:top-4"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pt-40 text-center sm:px-6 sm:pt-52 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-balance font-display text-3xl font-bold sm:text-5xl"
        >
          Pronto para transformar seu futuro?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-lg text-balance text-base text-muted sm:text-lg"
        >
          Milhares de desenvolvedores já começaram. O próximo pode ser você.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9"
        >
          <Button href="#" variant="primary" size="lg" showArrow>
            Quero ser aluno agora
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
