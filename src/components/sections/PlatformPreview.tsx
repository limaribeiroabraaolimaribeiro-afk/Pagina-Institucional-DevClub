import { type MouseEvent as ReactMouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { LayoutDashboard } from 'lucide-react'
import {
  platformStats,
  inProgressCourses,
  achievements,
  platformChannels,
  onlineMembers,
  communityOnlineCount,
  floatingWidgets,
  type FloatingWidget,
} from '../../data/platform'
import { AnimatedGrid } from '../effects/AnimatedGrid'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { assetUrl } from '../../lib/assetUrl'
import { Button } from '../ui/Button'

function WidgetBadge({ widget }: { widget: FloatingWidget }) {
  const Icon = widget.icon
  return (
    <div
      className={`flex items-center gap-2.5 whitespace-nowrap rounded-xl border bg-card/95 px-3.5 py-2.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur-sm ${
        widget.accent === 'green' ? 'border-green/25' : 'border-purple/25'
      }`}
    >
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
          widget.accent === 'green' ? 'bg-green/10 text-green' : 'bg-purple/10 text-purple-bright'
        }`}
      >
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-bold leading-none text-ink">
          <AnimatedCounter value={widget.value} suffix={widget.suffix ?? ''} />
        </p>
        <p className="mt-1 text-[10px] leading-none text-muted">{widget.label}</p>
      </div>
    </div>
  )
}

export function PlatformPreview() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 60, damping: 20, mass: 0.6 }
  const parallaxX = useSpring(mouseX, springConfig)
  const parallaxY = useSpring(mouseY, springConfig)

  function handleMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const relX = (event.clientX - bounds.left) / bounds.width - 0.5
    const relY = (event.clientY - bounds.top) / bounds.height - 0.5
    mouseX.set(relX * 14)
    mouseY.set(relY * 14)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section className="relative overflow-hidden bg-void py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="rounded-full border border-purple/30 bg-purple/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-purple-bright"
        >
          Plataforma
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-4 text-balance font-display text-2xl font-bold leading-tight text-ink sm:text-3xl md:text-4xl"
        >
          Uma plataforma feita para <span className="text-green">você evoluir</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-3 max-w-xl text-balance text-base text-muted sm:text-lg"
        >
          Acompanhe seu progresso, participe da comunidade e evolua todos os dias.
        </motion.p>

        <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative mt-8 sm:mt-10 lg:mt-12">
          <AnimatedGrid accent="green" className="opacity-50" />
          <motion.div
            aria-hidden="true"
            style={{ x: parallaxX, y: parallaxY }}
            className="pointer-events-none absolute -left-16 top-1/3 size-72 -translate-y-1/2 rounded-full bg-green/10 blur-[100px]"
          />
          <motion.div
            aria-hidden="true"
            style={{ x: parallaxX, y: parallaxY }}
            className="pointer-events-none absolute -right-16 bottom-0 size-72 rounded-full bg-purple/10 blur-[100px]"
          />

          <div className="relative mx-auto flex max-w-5xl flex-col gap-6 lg:flex-row lg:items-start lg:gap-0">
            <div className="relative w-full lg:w-[64%]">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/70 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)] backdrop-blur-sm"
              >
                <div className="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-md bg-green/15 text-green">
                      <LayoutDashboard className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-semibold text-muted">Painel do aluno</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[11px] text-green">
                    <span className="size-1.5 animate-blink rounded-full bg-green" aria-hidden="true" />
                    ao vivo
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <div>
                    <h3 className="text-lg font-bold text-ink sm:text-xl">Olá, DevClubber 👋</h3>
                    <p className="text-sm text-muted">Continue aprendendo de onde parou.</p>
                  </div>

                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {platformStats.map((stat) => {
                      const Icon = stat.icon
                      return (
                        <div
                          key={stat.label}
                          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5"
                        >
                          <Icon className="size-3.5 text-green" aria-hidden="true" />
                          <span className="text-sm font-bold text-ink">{stat.value}</span>
                          <span className="text-[11px] text-muted">{stat.label}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">Cursos em andamento</p>
                    <div className="mt-2 flex flex-col gap-1.5">
                      {inProgressCourses.map((course, index) => {
                        const Icon = course.icon
                        return (
                          <motion.div
                            key={course.name}
                            initial={{ opacity: 0, x: -14 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                            className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-2 transition-colors duration-300 hover:border-purple/30"
                          >
                            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-purple/10 text-purple-bright">
                              <Icon className="size-3.5" aria-hidden="true" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2 text-sm">
                                <span className="truncate font-medium text-ink">{course.name}</span>
                                <span className="shrink-0 text-xs text-muted">{course.status}</span>
                              </div>
                              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${course.percent}%` }}
                                  viewport={{ once: true, margin: '-40px' }}
                                  transition={{ duration: 0.8, delay: 0.2 + index * 0.08, ease: 'easeOut' }}
                                  className="h-full rounded-full bg-linear-to-r from-purple to-purple-bright"
                                />
                              </div>
                            </div>
                            <span className="shrink-0 text-xs font-semibold text-ink">{course.percent}%</span>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-2">
                    <div className="flex -space-x-2">
                      {achievements.map((achievement, index) => {
                        const Icon = achievement.icon
                        return (
                          <span
                            key={achievement.label}
                            title={achievement.label}
                            className="flex size-6 items-center justify-center rounded-full border-2 border-card bg-green/10 text-green"
                            style={{ zIndex: achievements.length - index }}
                          >
                            <Icon className="size-3" aria-hidden="true" />
                          </span>
                        )
                      })}
                    </div>
                    <span className="text-xs text-muted">{achievements.length} conquistas</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
                className="absolute -top-10 left-5 z-20 hidden lg:block"
              >
                <div className="animate-float-sm">
                  <WidgetBadge widget={floatingWidgets[0]} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.55, ease: 'easeOut' }}
                className="absolute -bottom-9 left-10 z-20 hidden lg:block"
              >
                <div className="animate-float-sm" style={{ animationDelay: '1.4s' }}>
                  <WidgetBadge widget={floatingWidgets[1]} />
                </div>
              </motion.div>
            </div>

            <div className="relative w-full lg:w-[38%] lg:-ml-10 lg:mt-14">
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-card/85 p-3.5 shadow-[0_25px_60px_-25px_rgba(139,61,255,0.35)] backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-ink">Comunidade</h3>
                  <span className="text-[11px] text-green">
                    {communityOnlineCount.toLocaleString('pt-BR')} online
                  </span>
                </div>

                <div className="mt-2.5 flex -space-x-3">
                  {onlineMembers.map((member, index) => (
                    <div
                      key={member.photo}
                      className="relative size-9 overflow-hidden rounded-full border-2 border-card"
                      style={{ zIndex: onlineMembers.length - index }}
                    >
                      <img src={assetUrl(member.photo)} alt="" loading="lazy" className="h-full w-full object-cover" />
                      {member.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 animate-blink rounded-full border-2 border-card bg-green" />
                      )}
                    </div>
                  ))}
                  <div className="flex size-9 items-center justify-center rounded-full border-2 border-card bg-void text-[10px] font-semibold text-muted">
                    +2k
                  </div>
                </div>

                <ul className="mt-3 flex flex-col gap-2">
                  {platformChannels.map((channel) => {
                    const Icon = channel.icon
                    return (
                      <li key={channel.label} className="flex items-start gap-2.5">
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-purple/10 text-purple-bright">
                          <Icon className="size-3.5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-ink">{channel.label}</p>
                          <p className="truncate text-[11px] text-muted">{channel.detail}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>

                <Button href="#quero-ser-aluno" variant="secondary" size="md" className="mt-3 w-full justify-center">
                  Entrar na comunidade
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
                className="absolute -top-12 right-4 z-20 hidden lg:block"
              >
                <div className="animate-float-sm" style={{ animationDelay: '0.7s' }}>
                  <WidgetBadge widget={floatingWidgets[2]} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.75, ease: 'easeOut' }}
                className="absolute -bottom-12 right-6 z-20 hidden lg:block"
              >
                <div className="animate-float-sm" style={{ animationDelay: '2.1s' }}>
                  <WidgetBadge widget={floatingWidgets[3]} />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 lg:hidden">
            {floatingWidgets.map((widget, index) => (
              <motion.div
                key={widget.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <WidgetBadge widget={widget} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
