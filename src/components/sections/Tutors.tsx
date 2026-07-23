import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, User } from 'lucide-react'
import { tutors, type Tutor } from '../../data/tutors'
import { SectionTitle } from '../ui/SectionTitle'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons'

const socialIcons = { linkedin: LinkedinIcon, github: GithubIcon, instagram: InstagramIcon } as const

function TutorPhoto({ tutor, className }: { tutor: Tutor; className?: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-linear-to-br from-purple/25 via-card to-green/10 ${className ?? ''}`}
      >
        <User className="size-10 text-ink/40" aria-hidden="true" />
      </div>
    )
  }

  return (
    <img
      src={tutor.photo}
      alt={`Retrato ilustrativo de ${tutor.name}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover object-[center_top] ${className ?? ''}`}
    />
  )
}

export function Tutors() {
  const [activeTutor, setActiveTutor] = useState<Tutor | null>(null)

  useEffect(() => {
    if (!activeTutor) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setActiveTutor(null)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeTutor])

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

        <ul className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 xl:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {tutors.map((tutor, index) => (
            <motion.li
              key={tutor.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (index % 5) * 0.08 }}
              className="group relative aspect-[3/4] w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-green/50 hover:shadow-[0_0_32px_-10px_rgba(46,234,83,0.45)] sm:w-auto lg:aspect-auto lg:h-[380px]"
            >
              <div className="relative h-[74%] w-full overflow-hidden">
                <TutorPhoto
                  tutor={tutor}
                  className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-void via-void/35 to-transparent"
                />

                <button
                  type="button"
                  onClick={() => setActiveTutor(tutor)}
                  aria-haspopup="dialog"
                  aria-label={`Ver detalhes de ${tutor.name}`}
                  className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-void/70 text-ink backdrop-blur-sm transition-all duration-300 hover:border hover:border-green/50 hover:text-green group-hover:rotate-90"
                >
                  <Plus className="size-4" aria-hidden="true" />
                </button>

                <p className="absolute inset-x-3 bottom-2.5 truncate text-[11px] font-medium text-green opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100">
                  {tutor.specialty}
                </p>
              </div>

              <div className="flex h-[26%] flex-col justify-center px-4">
                <p className="truncate text-sm font-semibold text-ink">{tutor.name}</p>
                <p className="truncate text-xs text-muted">{tutor.role}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {activeTutor && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalhes de ${activeTutor.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-void/90 p-4 backdrop-blur-sm"
            onClick={() => setActiveTutor(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-card"
            >
              <button
                type="button"
                onClick={() => setActiveTutor(null)}
                aria-label="Fechar detalhes"
                className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-void/70 text-ink hover:text-green"
              >
                <X className="size-4" aria-hidden="true" />
              </button>

              <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-4">
                  <div className="size-16 shrink-0 overflow-hidden rounded-full border-2 border-green/30">
                    <TutorPhoto tutor={activeTutor} className="h-full w-full" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{activeTutor.name}</h3>
                    <p className="text-sm text-muted">
                      {activeTutor.role} · {activeTutor.company}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-ink">{activeTutor.specialty}</p>
                <p className="text-xs text-green">{activeTutor.experience}</p>

                <div className="flex flex-wrap gap-2">
                  {activeTutor.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 border-t border-white/10 pt-4">
                  {Object.entries(activeTutor.socials).map(([platform, href]) => {
                    const Icon = socialIcons[platform as keyof typeof socialIcons]
                    return (
                      <a
                        key={platform}
                        href={href}
                        aria-label={`${activeTutor.name} no ${platform}`}
                        className="flex size-8 items-center justify-center rounded-full border border-white/10 text-muted hover:border-green/50 hover:text-green"
                      >
                        <Icon className="size-4" aria-hidden="true" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
