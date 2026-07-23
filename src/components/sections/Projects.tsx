import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects, type ProjectSize } from '../../data/projects'
import { SectionTitle } from '../ui/SectionTitle'
import { ProjectPreview } from '../ui/ProjectPreview'
import { Button } from '../ui/Button'

const colSpan: Record<ProjectSize, string> = {
  principal: 'sm:col-span-2 lg:col-span-12 xl:col-span-7',
  featured: 'sm:col-span-2 lg:col-span-6 xl:col-span-5',
  medio: 'sm:col-span-1 lg:col-span-6 xl:col-span-4',
  menor: 'sm:col-span-1 lg:col-span-6 xl:col-span-3',
}

const cardConfig: Record<
  ProjectSize,
  {
    height: string
    previewHeight: string
    padding: string
    titleSize: string
    descSize: string
    descClamp: string
    gap: string
    tagCount: number
  }
> = {
  principal: {
    height: 'lg:h-[460px]',
    previewHeight: 'aspect-video lg:aspect-auto lg:h-[62%]',
    padding: 'p-5 sm:p-6',
    titleSize: 'text-2xl sm:text-3xl',
    descSize: 'text-sm',
    descClamp: 'line-clamp-2',
    gap: 'gap-2.5',
    tagCount: 3,
  },
  featured: {
    height: 'lg:h-[335px]',
    previewHeight: 'aspect-video lg:aspect-auto lg:h-[60%]',
    padding: 'p-4',
    titleSize: 'text-base sm:text-lg',
    descSize: 'text-xs',
    descClamp: 'line-clamp-2',
    gap: 'gap-1.5',
    tagCount: 2,
  },
  medio: {
    height: 'lg:h-[335px]',
    previewHeight: 'aspect-video lg:aspect-auto lg:h-[60%]',
    padding: 'p-4',
    titleSize: 'text-base sm:text-lg',
    descSize: 'text-xs',
    descClamp: 'line-clamp-2',
    gap: 'gap-1.5',
    tagCount: 2,
  },
  menor: {
    height: 'lg:h-[270px]',
    previewHeight: 'aspect-video lg:aspect-auto lg:h-[52%]',
    padding: 'p-3.5',
    titleSize: 'text-sm sm:text-base',
    descSize: 'text-[11px]',
    descClamp: 'line-clamp-2',
    gap: 'gap-1',
    tagCount: 2,
  },
}

const tallSlugs = new Set(['chatbot-ia', 'plataforma-cursos'])

const levelColor: Record<string, string> = {
  Iniciante: 'text-green border-green/30 bg-green/10',
  Intermediário: 'text-purple-bright border-purple/30 bg-purple/10',
  Avançado: 'text-ink border-white/20 bg-white/5',
}

const accentGlow: Record<'green' | 'purple', string> = {
  green: 'hover:border-green/40 hover:shadow-[0_0_36px_-14px_rgba(46,234,83,0.5)]',
  purple: 'hover:border-purple/40 hover:shadow-[0_0_36px_-14px_rgba(139,61,255,0.5)]',
}

export function Projects() {
  return (
    <section className="relative bg-void py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Portfólio"
          title="Projetos práticos que constroem seu portfólio"
          description="Aplicações completas para você aprender fazendo, do primeiro commit ao deploy."
        />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12">
          {projects.map((project, index) => {
            const config = cardConfig[project.size]
            const isPrincipal = project.size === 'principal'
            const isTall = tallSlugs.has(project.slug)
            const heightClass = isTall ? 'lg:h-[288px]' : config.height
            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (index % 5) * 0.06 }}
                className={`group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 ${accentGlow[project.accent]} ${colSpan[project.size]} ${heightClass} ${
                  isPrincipal
                    ? 'border-green/25 shadow-[0_0_50px_-28px_rgba(46,234,83,0.55)]'
                    : 'border-white/10'
                }`}
              >
                <div className={`relative w-full shrink-0 overflow-hidden ${config.previewHeight}`}>
                  <div className="size-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                    <ProjectPreview type={project.preview} accent={project.accent} />
                  </div>
                </div>

                <div className={`flex flex-1 flex-col ${config.gap} ${config.padding}`}>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${levelColor[project.level]}`}
                    >
                      {project.level}
                    </span>
                    {project.stack.slice(0, config.tagCount).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className={`font-semibold text-ink ${config.titleSize}`}>{project.name}</h3>

                  <p className={`${config.descClamp} ${config.descSize} text-muted`}>{project.description}</p>

                  {isPrincipal ? (
                    <a
                      href="#"
                      className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border border-green/30 bg-green/15 px-4 py-2 text-sm font-semibold text-green transition-all duration-300 hover:gap-2 hover:bg-green/25"
                    >
                      Ver projeto
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <a
                      href="#"
                      className="mt-auto inline-flex w-fit items-center gap-1 pt-1 text-xs font-semibold text-green opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:translate-x-0.5 lg:group-hover:opacity-100"
                    >
                      Ver projeto
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button href="#" variant="secondary" size="md" showArrow>
            Ver todos os projetos
          </Button>
        </div>
      </div>
    </section>
  )
}
