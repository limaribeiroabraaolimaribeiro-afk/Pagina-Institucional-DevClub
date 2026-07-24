import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { companies, type Company } from '../../data/companies'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { assetUrl } from '../../lib/assetUrl'

function CompanyLogo({ company, className }: { company: Company; className: string }) {
  return (
    <span className="inline-flex shrink-0 bg-surface opacity-80 transition-opacity duration-300 hover:opacity-100">
      <img src={assetUrl(company.logo)} alt={company.name} loading="lazy" className={`${className} mix-blend-screen`} />
    </span>
  )
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      setValue(target)
      return
    }

    let frame = 0
    let start: number | null = null
    const duration = 1600

    function step(timestamp: number) {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [isInView, prefersReducedMotion, target])

  return (
    <span ref={ref}>
      +{value}
      {suffix}
    </span>
  )
}

const studentPhotos = [
  { src: '/img/social-proof/student-1.jpg', accent: 'rgba(255,255,255,0.5)' },
  { src: '/img/social-proof/student-2.jpg', accent: 'rgba(46,234,83,0.6)' },
  { src: '/img/social-proof/student-3.jpg', accent: 'rgba(255,255,255,0.4)' },
  { src: '/img/social-proof/student-4.jpg', accent: 'rgba(255,255,255,0.4)' },
  { src: '/img/social-proof/student-5.jpg', accent: 'rgba(46,234,83,0.5)' },
  { src: '/img/social-proof/student-6.jpg', accent: 'rgba(255,255,255,0.4)' },
]

export function SocialProof() {
  return (
    <section className="relative border-y border-white/5 bg-surface pt-8 pb-9">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 items-center gap-8 text-center lg:grid-cols-[minmax(230px,0.5fr)_minmax(0,2.2fr)] lg:gap-8 lg:text-left"
        >
          <div className="flex flex-col items-center gap-3 lg:items-start">
            <div className="flex -space-x-4">
              {studentPhotos.map((photo, index) => (
                <div
                  key={photo.src}
                  className="relative size-12 shrink-0 overflow-hidden rounded-full border-[3px] border-surface sm:size-14"
                  style={{ zIndex: studentPhotos.length - index, boxShadow: `inset 0 0 0 1.5px ${photo.accent}` }}
                >
                  <img src={assetUrl(photo.src)} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>

            <p className="max-w-[15rem] text-2xl font-bold leading-snug text-ink sm:text-3xl lg:max-w-none">
              <span className="text-green">
                <AnimatedCounter target={30} suffix=" mil" />
              </span>{' '}
              alunos transformados
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 lg:items-start">
            <p className="text-xs font-medium uppercase tracking-widest text-muted sm:text-sm">
              Eles trabalham ou já trabalharam em:
            </p>

            <div className="hidden flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:flex lg:justify-start lg:gap-x-5">
              {companies.map((company) => (
                <CompanyLogo
                  key={company.name}
                  company={company}
                  className="h-8 w-auto object-contain sm:h-9 lg:h-10"
                />
              ))}
            </div>

            <div
              className="w-full overflow-hidden bg-surface sm:hidden"
              style={{ maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}
            >
              <div className="flex w-max animate-marquee items-center gap-9 motion-reduce:animate-none">
                {[...companies, ...companies].map((company, index) => (
                  <CompanyLogo
                    key={`${company.name}-${index}`}
                    company={company}
                    className="h-8 w-auto object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
