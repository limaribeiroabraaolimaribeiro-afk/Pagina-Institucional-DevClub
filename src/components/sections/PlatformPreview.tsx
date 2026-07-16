import { motion } from 'framer-motion'
import { platformStats, platformChannels, onlineMembers } from '../../data/platform'
import { SectionTitle } from '../ui/SectionTitle'
import { GlowCard } from '../ui/GlowCard'

export function PlatformPreview() {
  return (
    <section className="relative bg-surface py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Plataforma"
          title={
            <>
              Uma plataforma feita para <span className="text-green">você evoluir</span>
            </>
          }
          description="Acompanhe seu progresso, participe da comunidade e evolua todos os dias."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-5">
          <GlowCard accent="green" tilt={false} className="p-6 sm:p-8 lg:col-span-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-ink">Seu progresso</h3>
              <span className="flex items-center gap-1.5 text-xs text-green">
                <span className="size-1.5 animate-blink rounded-full bg-green" />
                ao vivo
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-6">
              {platformStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted">
                        <Icon className="size-4 text-green" aria-hidden="true" />
                        {stat.label}
                      </span>
                      <span className="font-semibold text-ink">{stat.value}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.progress}%` }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 1, delay: index * 0.15, ease: 'easeOut' }}
                        className="h-full rounded-full bg-linear-to-r from-green to-green-bright"
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
              {[
                { label: '18 projetos concluídos', accent: 'purple' as const },
                { label: '3 trilhas ativas', accent: 'green' as const },
              ].map((chip) => (
                <motion.span
                  key={chip.label}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium ${
                    chip.accent === 'purple'
                      ? 'border-purple/30 bg-purple/10 text-purple-bright'
                      : 'border-green/30 bg-green/10 text-green'
                  }`}
                >
                  {chip.label}
                </motion.span>
              ))}
            </div>
          </GlowCard>

          <GlowCard accent="purple" tilt={false} className="p-6 sm:p-8 lg:col-span-2">
            <h3 className="text-lg font-semibold text-ink">Comunidade online</h3>

            <div className="mt-5 flex -space-x-3">
              {onlineMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative flex size-10 items-center justify-center rounded-full border-2 border-surface bg-linear-to-br from-purple to-green text-xs font-bold text-void"
                >
                  {member.name.slice(0, 2).toUpperCase()}
                  {member.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 size-3 animate-blink rounded-full border-2 border-surface bg-green" />
                  )}
                </motion.div>
              ))}
              <div className="flex size-10 items-center justify-center rounded-full border-2 border-surface bg-card text-[11px] font-semibold text-muted">
                +2k
              </div>
            </div>

            <ul className="mt-6 flex flex-col gap-4">
              {platformChannels.map((channel) => {
                const Icon = channel.icon
                return (
                  <li key={channel.label} className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple/10 text-purple-bright">
                      <Icon className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">{channel.label}</p>
                      <p className="text-xs text-muted">{channel.detail}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </GlowCard>
        </div>
      </div>
    </section>
  )
}
