import { useRef, type MouseEvent as ReactMouseEvent } from 'react'
import { ChevronLeft, ChevronRight, FolderKanban } from 'lucide-react'
import { courses } from '../../data/courses'
import { GlowCard } from '../ui/GlowCard'
import { SectionTitle } from '../ui/SectionTitle'

export function Courses() {
  const scrollerRef = useRef<HTMLUListElement>(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const scrollStartX = useRef(0)

  function scrollByAmount(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  function handlePointerDown(event: ReactMouseEvent<HTMLUListElement>) {
    if (!scrollerRef.current) return
    isDragging.current = true
    dragStartX.current = event.pageX
    scrollStartX.current = scrollerRef.current.scrollLeft
  }

  function handlePointerMove(event: ReactMouseEvent<HTMLUListElement>) {
    if (!isDragging.current || !scrollerRef.current) return
    const delta = event.pageX - dragStartX.current
    scrollerRef.current.scrollLeft = scrollStartX.current - delta
  }

  function stopDragging() {
    isDragging.current = false
  }

  return (
    <section id="formacoes" className="relative bg-void py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle
            align="left"
            eyebrow="Formações"
            title={
              <>
                Formações completas para você ir do <span className="text-green">ZERO ao AVANÇADO</span>
              </>
            }
            className="max-w-2xl"
          />

          <div className="hidden gap-3 lg:flex">
            <button
              type="button"
              onClick={() => scrollByAmount(-360)}
              aria-label="Formação anterior"
              className="flex size-11 items-center justify-center rounded-full border border-white/15 text-ink transition-colors hover:border-purple/60 hover:text-purple-bright"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(360)}
              aria-label="Próxima formação"
              className="flex size-11 items-center justify-center rounded-full border border-white/15 text-ink transition-colors hover:border-purple/60 hover:text-purple-bright"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          ref={scrollerRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {courses.map((course) => {
            const Icon = course.icon
            return (
              <li key={course.slug} className="w-[260px] shrink-0 snap-start sm:w-[280px]">
                <GlowCard accent="purple" className="h-full p-6">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-purple/10 text-purple-bright">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{course.name}</h3>
                  <p className="mt-2 text-sm text-muted">{course.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <FolderKanban className="size-3.5" aria-hidden="true" />
                      {course.projects} projetos
                    </span>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 font-medium text-ink">
                      {course.level}
                    </span>
                  </div>
                </GlowCard>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
