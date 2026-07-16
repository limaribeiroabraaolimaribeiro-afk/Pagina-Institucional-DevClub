import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects, type ProjectSize } from '../../data/projects'
import { SectionTitle } from '../ui/SectionTitle'

const sizeSpan: Record<ProjectSize, string> = {
  lg: 'sm:col-span-2 sm:row-span-2',
  md: 'sm:col-span-2',
  sm: 'sm:col-span-1',
}

const levelColor: Record<string, string> = {
  Iniciante: 'text-green border-green/30 bg-green/10',
  Intermediário: 'text-purple-bright border-purple/30 bg-purple/10',
  Avançado: 'text-ink border-white/20 bg-white/5',
}

export function Projects() {
  return (
    <section className="relative bg-void py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Portfólio"
          title="Projetos práticos que constroem seu portfólio"
          description="Aplicações completas para você aprender fazendo, do primeiro commit ao deploy."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-4 sm:auto-rows-[220px]">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
              className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-card p-6 [perspective:1000px] ${sizeSpan[project.size]}`}
            >
              <img
                src="/img/projects/projects-preview.png"
                alt=""
                aria-hidden="true"
                className="absolute -right-8 -top-8 size-32 rotate-12 object-contain opacity-[0.08] transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-[0.14]"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-void via-void/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
              />

              <div className="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${levelColor[project.level]}`}>
                    {project.level}
                  </span>
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-muted">
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="mt-3 text-lg font-semibold text-ink sm:text-xl">{project.name}</h3>
                <p className="mt-1.5 max-w-md text-sm text-muted">{project.description}</p>

                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  Ver projeto
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
