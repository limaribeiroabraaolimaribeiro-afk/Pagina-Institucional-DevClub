import { motion } from 'framer-motion'
import { companies } from '../../data/companies'

const avatarSeeds = [
  { initials: 'AL', from: 'from-green', to: 'to-green-bright' },
  { initials: 'BR', from: 'from-purple', to: 'to-purple-bright' },
  { initials: 'CM', from: 'from-green-bright', to: 'to-purple' },
  { initials: 'DS', from: 'from-purple-bright', to: 'to-green' },
  { initials: 'EL', from: 'from-green', to: 'to-purple-bright' },
]

export function SocialProof() {
  return (
    <section className="relative border-y border-white/5 bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:text-left"
        >
          <div className="flex -space-x-3">
            {avatarSeeds.map((avatar) => (
              <div
                key={avatar.initials}
                className={`flex size-10 items-center justify-center rounded-full border-2 border-surface bg-linear-to-br ${avatar.from} ${avatar.to} text-xs font-bold text-void`}
              >
                {avatar.initials}
              </div>
            ))}
          </div>
          <p className="text-lg font-semibold text-ink">
            <span className="text-green">+30 mil</span> alunos transformados
          </p>
        </motion.div>

        <p className="mt-12 text-center text-sm font-medium uppercase tracking-widest text-muted">
          Eles trabalham ou já trabalharam em:
        </p>

        <div className="mt-8 hidden flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:flex">
          {companies.map((company) => (
            <img
              key={company.name}
              src={company.logo}
              alt={company.name}
              loading="lazy"
              className="h-6 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 lg:h-7"
            />
          ))}
        </div>

        <div className="mt-8 overflow-hidden sm:hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}>
          <div className="flex w-max animate-marquee items-center gap-10">
            {[...companies, ...companies].map((company, index) => (
              <img
                key={`${company.name}-${index}`}
                src={company.logo}
                alt={company.name}
                loading="lazy"
                className="h-6 w-auto shrink-0 object-contain opacity-60 grayscale"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
