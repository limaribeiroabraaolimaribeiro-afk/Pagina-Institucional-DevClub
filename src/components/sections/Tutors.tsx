import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { tutors } from '../../data/tutors'
import { SectionTitle } from '../ui/SectionTitle'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons'

const socialIcons = { linkedin: LinkedinIcon, github: GithubIcon, instagram: InstagramIcon } as const

export function Tutors() {
  const [expandedTutor, setExpandedTutor] = useState<string | null>(null)

  return (
    <section className="relative overflow-hidden bg-void py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139,61,255,0.12), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Time de tutores"
          title="Aprenda com quem vive o mercado"
          description="Profissionais atuantes em grandes empresas de tecnologia, prontos para acelerar sua jornada."
        />

        <ul className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible lg:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {tutors.map((tutor, index) => {
            const isExpanded = expandedTutor === tutor.name
            return (
              <motion.li
                key={tutor.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (index % 5) * 0.08 }}
                className="group relative w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-card transition-colors duration-300 hover:border-green/50 sm:w-auto"
              >
                <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-linear-to-br from-purple/25 via-card to-green/10">
                  <span className="text-4xl font-bold text-ink/90 transition-transform duration-500 ease-out group-hover:scale-110">
                    {tutor.name
                      .split(' ')
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')}
                  </span>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-void via-void/20 to-transparent opacity-90"
                  />

                  <button
                    type="button"
                    onClick={() => setExpandedTutor(isExpanded ? null : tutor.name)}
                    aria-expanded={isExpanded}
                    aria-label={`Ver mais sobre ${tutor.name}`}
                    className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-void/70 text-ink backdrop-blur-sm"
                  >
                    <Plus
                      className={`size-4 transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <p className="text-sm font-semibold text-ink">{tutor.name}</p>
                    <p className="text-xs text-muted">{tutor.role}</p>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-2 p-4 pt-3">
                        <p className="text-xs text-muted">
                          {tutor.company} · {tutor.specialty}
                        </p>
                        <div className="flex gap-2">
                          {Object.entries(tutor.socials).map(([platform, href]) => {
                            const Icon = socialIcons[platform as keyof typeof socialIcons]
                            return (
                              <a
                                key={platform}
                                href={href}
                                aria-label={`${tutor.name} no ${platform}`}
                                className="flex size-7 items-center justify-center rounded-full border border-white/10 text-muted hover:border-green/50 hover:text-green"
                              >
                                <Icon className="size-3.5" aria-hidden="true" />
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
