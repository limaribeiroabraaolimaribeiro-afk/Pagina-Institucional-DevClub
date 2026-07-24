import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, Star, X } from 'lucide-react'
import { featuredTestimonial, testimonials } from '../../data/testimonials'
import { SectionTitle } from '../ui/SectionTitle'
import { GlowCard } from '../ui/GlowCard'
import { assetUrl } from '../../lib/assetUrl'

export function Testimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!isModalOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsModalOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  return (
    <section className="relative bg-surface py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Depoimentos"
          title="Milhares de vidas transformadas dentro da nossa comunidade"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/10"
              aria-haspopup="dialog"
            >
              <img
                src={assetUrl(featuredTestimonial.thumbnail)}
                alt={`Depoimento em vídeo de ${featuredTestimonial.name}`}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-void/80 via-void/10 to-transparent" />

              <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-green/90 shadow-[0_0_40px_-4px_rgba(46,234,83,0.7)] transition-transform duration-300 ease-out group-hover:scale-110 sm:size-20">
                <Play className="ml-1 size-6 fill-void text-void sm:size-7" aria-hidden="true" />
              </span>

              <span className="absolute bottom-4 left-4 text-left text-sm font-medium text-ink">
                {featuredTestimonial.name} · {featuredTestimonial.role} na {featuredTestimonial.company}
              </span>
            </button>

            <blockquote className="mt-6 text-balance text-lg text-muted">
              “{featuredTestimonial.quote}”
            </blockquote>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {testimonials.map((testimonial) => (
              <GlowCard key={testimonial.name} accent="purple" className="p-5">
                <div className="flex items-center gap-0.5" aria-label={`${testimonial.rating} de 5 estrelas`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`size-3.5 ${index < testimonial.rating ? 'fill-green text-green' : 'text-white/15'}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted">“{testimonial.quote}”</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                    <p className="text-xs text-muted">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-green/30 bg-green/10 px-2.5 py-1 text-[11px] font-medium text-green">
                    {testimonial.timeToHire}
                  </span>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Depoimento em vídeo de ${featuredTestimonial.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-void/90 p-4 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-card"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Fechar vídeo"
                className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-void/70 text-ink hover:text-green"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
              <div className="flex aspect-video items-center justify-center bg-void">
                <p className="px-6 text-center text-sm text-muted">
                  Vídeo de depoimento fictício para fins de demonstração do layout.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
