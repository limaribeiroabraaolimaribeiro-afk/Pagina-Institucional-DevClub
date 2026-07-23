import {
  Play,
  Search,
  ShoppingCart,
  ShoppingBag,
  Send,
  ArrowUp,
  ArrowDown,
  Film,
  CheckCircle2,
  Circle,
} from 'lucide-react'
import type { ProjectAccent, ProjectPreviewType } from '../../data/projects'

interface ProjectPreviewProps {
  type: ProjectPreviewType
  accent: ProjectAccent
}

function ChromeBar() {
  return (
    <div className="flex items-center gap-1.5 border-b border-white/5 bg-black/20 px-3 py-1.5">
      <span className="size-1.5 rounded-full bg-white/15" />
      <span className="size-1.5 rounded-full bg-white/15" />
      <span className="size-1.5 rounded-full bg-white/15" />
    </div>
  )
}

export function ProjectPreview({ type, accent }: ProjectPreviewProps) {
  const strong = accent === 'green' ? 'bg-green/40' : 'bg-purple/40'
  const soft = accent === 'green' ? 'bg-green/15' : 'bg-purple/15'
  const text = accent === 'green' ? 'text-green' : 'text-purple-bright'

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a0e14] text-[7px] leading-none">
      <ChromeBar />

      {type === 'ecommerce' && (
        <div className="flex flex-1 flex-col gap-2 p-2.5">
          <div className="flex items-center justify-between rounded-md bg-white/[0.04] px-2 py-1.5">
            <div className="flex items-center gap-1">
              <span className={`flex size-3.5 items-center justify-center rounded-sm ${strong}`}>
                <ShoppingBag className="size-2 text-void" aria-hidden="true" />
              </span>
              <span className="font-semibold text-white/60">Loja</span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <Search className="size-2.5" aria-hidden="true" />
              <ShoppingCart className="size-2.5" aria-hidden="true" />
            </div>
          </div>
          <div className={`flex h-7 items-center justify-between rounded-md bg-linear-to-r px-2.5 ${accent === 'green' ? 'from-green/25 to-purple/15' : 'from-purple/25 to-green/15'}`}>
            <div className="space-y-1">
              <div className="h-1 w-14 rounded-full bg-white/30" />
              <div className="h-1 w-9 rounded-full bg-white/15" />
            </div>
            <span className={`rounded px-1.5 py-0.5 text-[6px] font-semibold text-void ${accent === 'green' ? 'bg-green' : 'bg-purple-bright'}`}>
              -30%
            </span>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-1.5">
            {[0, 1, 2].map((tile) => (
              <div key={tile} className="flex flex-col gap-1 rounded-md bg-white/[0.04] p-1.5">
                <div
                  className={`flex flex-1 items-center justify-center rounded ${tile === 1 ? soft : 'bg-white/[0.07]'}`}
                >
                  <ShoppingBag className={`size-3 ${tile === 1 ? text : 'text-white/25'}`} aria-hidden="true" />
                </div>
                <div className="flex items-center gap-0.5 text-amber-400/80">★★★★☆</div>
                <span className={`font-semibold ${text}`}>R$ {129 + tile * 40}</span>
                <div className={`rounded-sm py-0.5 text-center font-medium text-void ${strong.replace('/40', '')}`}>
                  Comprar
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'dashboard' && (
        <div className="flex flex-1 flex-col gap-2 p-2.5">
          <div className="flex gap-1.5">
            {[
              { label: 'Receita', value: 'R$45k', accentUp: true },
              { label: 'Usuários', value: '1.2k', accentUp: true },
              { label: 'Churn', value: '2.4%', accentUp: false },
            ].map((stat) => (
              <div key={stat.label} className="flex-1 rounded-md bg-white/[0.04] p-1.5">
                <div className="text-white/40">{stat.label}</div>
                <div className="mt-0.5 flex items-center gap-0.5 font-semibold text-ink">
                  {stat.value}
                  {stat.accentUp ? (
                    <ArrowUp className={`size-2 ${text}`} aria-hidden="true" />
                  ) : (
                    <ArrowDown className="size-2 text-white/40" aria-hidden="true" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="relative flex flex-1 items-end gap-1 rounded-md bg-white/[0.03] p-1.5">
            {[40, 70, 55, 90, 65, 45, 75].map((height, index) => (
              <div key={index} className={`flex-1 rounded-t ${index % 2 === 0 ? strong : soft}`} style={{ height: `${height}%` }} />
            ))}
            <svg className="absolute inset-0 size-full" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
              <polyline
                points="0,30 15,22 30,26 45,10 60,18 75,8 100,14"
                fill="none"
                className={text}
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.8"
              />
            </svg>
          </div>
        </div>
      )}

      {type === 'terminal' && (
        <div className="flex flex-1 flex-col gap-1.5 p-2.5 font-mono">
          <div className="flex items-center gap-1.5">
            <span className={`rounded px-1.5 py-0.5 font-semibold text-void ${strong.replace('/40', '')}`}>GET</span>
            <span className="text-white/50">/api/users/:id</span>
          </div>
          <div className="space-y-0.5 rounded-md bg-white/[0.04] p-1.5">
            <div><span className="text-purple-bright">const</span> <span className="text-white/70">user</span> = <span className={text}>await</span> db.find()</div>
            <div className="text-white/40">if (!user) throw 404</div>
            <div><span className="text-purple-bright">return</span> res.json(user)</div>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-1 rounded-md bg-black/30 p-1.5">
            <span className={`inline-flex w-fit items-center rounded px-1.5 py-0.5 font-semibold ${soft} ${text}`}>200 OK</span>
            <div className="text-white/50">{'{ "id": 1, "name": "Ana" }'}</div>
          </div>
        </div>
      )}

      {type === 'marketplace' && (
        <div className="flex flex-1 flex-col gap-2 p-2.5">
          <div className="flex items-center gap-1.5 rounded-md bg-white/[0.05] px-2 py-1 text-white/40">
            <Search className="size-2.5 shrink-0" aria-hidden="true" />
            <div className="h-1 w-16 rounded-full bg-white/15" />
          </div>
          <div className="grid flex-1 grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((card) => (
              <div key={card} className="flex flex-col gap-1 rounded-md bg-white/[0.04] p-1.5">
                <div className="flex items-center gap-1.5">
                  <span className={`size-3.5 shrink-0 rounded-full ${card % 2 === 0 ? strong : soft}`} />
                  <div className="h-1 w-full rounded-full bg-white/15" />
                </div>
                <div className="flex items-center gap-0.5 text-amber-400/80">★★★★☆</div>
                <span className={`font-semibold ${text}`}>R$ {80 + card * 25}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'streaming' && (
        <div className="flex flex-1 flex-col gap-1.5 p-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-white/70">
              <Film className={`size-2.5 ${text}`} aria-hidden="true" />
              <span className="font-bold">StreamPlay</span>
            </div>
            <div className="flex gap-1.5 text-white/35">
              <span className="text-white/70">Início</span>
              <span>Séries</span>
              <span>Filmes</span>
            </div>
          </div>
          <div className={`relative flex h-11 flex-col justify-end overflow-hidden rounded-md bg-linear-to-br p-1.5 ${accent === 'green' ? 'from-green/30 via-void to-purple/20' : 'from-purple/30 via-void to-green/20'}`}>
            <span className={`absolute right-1.5 top-1.5 rounded px-1 py-0.5 font-semibold ${soft} ${text}`}>
              ★ 9.2
            </span>
            <div className="h-1.5 w-16 rounded-full bg-white/50" />
            <div className="mt-1 h-1 w-10 rounded-full bg-white/25" />
            <span className={`mt-1.5 inline-flex w-fit items-center gap-1 rounded px-1.5 py-0.5 font-semibold text-void ${strong.replace('/40', '')}`}>
              <Play className="size-2" fill="currentColor" aria-hidden="true" /> Assistir
            </span>
          </div>
          <div className="text-white/40">Em alta</div>
          <div className="flex flex-1 gap-1">
            {[0.95, 0.6, 0.85, 0.5, 0.75, 0.9].map((opacity, index) => (
              <div key={index} className="flex-1 rounded bg-white/15" style={{ opacity }} />
            ))}
          </div>
        </div>
      )}

      {type === 'todo' && (
        <div className="flex flex-1 flex-col gap-2 p-2.5">
          <div className="flex gap-1">
            {['Todas', 'Pendentes', 'Feitas'].map((filter, index) => (
              <span
                key={filter}
                className={`rounded-full px-1.5 py-0.5 font-medium ${index === 0 ? `${soft} ${text}` : 'bg-white/[0.05] text-white/40'}`}
              >
                {filter}
              </span>
            ))}
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1.5">
            {[
              { done: true, priority: 'bg-white/20' },
              { done: false, priority: 'bg-red-400/70' },
              { done: false, priority: accent === 'green' ? 'bg-green' : 'bg-purple-bright' },
              { done: true, priority: 'bg-white/20' },
            ].map((row, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <span className={`size-2.5 shrink-0 rounded-full border ${row.done ? `${strong} border-transparent` : 'border-white/25'}`} />
                <div className={`h-1 flex-1 rounded-full bg-white/15 ${row.done ? 'opacity-40' : ''}`} />
                <span className={`size-1.5 shrink-0 rounded-full ${row.priority}`} />
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'chat' && (
        <div className="flex flex-1 flex-col p-2.5">
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5">
            <span className={`size-3 rounded-full ${strong}`} />
            <div className="h-1 w-10 rounded-full bg-white/25" />
          </div>
          <div className="flex flex-1 flex-col justify-end gap-1.5 py-1.5">
            <div className="max-w-[65%] self-start rounded-lg rounded-bl-sm bg-white/[0.06] px-1.5 py-1">
              <div className="h-1 w-14 rounded-full bg-white/20" />
            </div>
            <div className={`max-w-[70%] self-end rounded-lg rounded-br-sm px-1.5 py-1 ${soft}`}>
              <div className={`h-1 w-16 rounded-full ${strong}`} />
            </div>
            <div className="flex items-center gap-0.5 self-start rounded-lg bg-white/[0.06] px-1.5 py-1">
              <span className="size-1 animate-pulse rounded-full bg-white/40" />
              <span className="size-1 animate-pulse rounded-full bg-white/40 [animation-delay:0.15s]" />
              <span className="size-1 animate-pulse rounded-full bg-white/40 [animation-delay:0.3s]" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-white/[0.05] px-1.5 py-1 text-white/30">
            <div className="h-1 flex-1 rounded-full bg-white/10" />
            <Send className={`size-2.5 shrink-0 ${text}`} aria-hidden="true" />
          </div>
        </div>
      )}

      {type === 'finance' && (
        <div className="flex flex-1 flex-col gap-1.5 p-2.5">
          <div className="text-white/40">Saldo disponível</div>
          <div className="flex items-end gap-1.5">
            <span className="font-semibold text-ink" style={{ fontSize: '10px' }}>R$ 12.480</span>
            <span className={`flex items-center font-semibold ${text}`}>
              <ArrowUp className="size-2" aria-hidden="true" />
              8%
            </span>
          </div>
          <div className="flex flex-1 items-end gap-1 rounded-md bg-white/[0.03] p-1.5">
            {[30, 55, 40, 80, 60, 90].map((height, index) => (
              <div key={index} className={`flex-1 rounded-t ${index === 3 ? strong : 'bg-white/10'}`} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-green">
              <ArrowUp className="size-2" aria-hidden="true" /> Receitas
            </span>
            <span className="flex items-center gap-1 text-red-400/80">
              <ArrowDown className="size-2" aria-hidden="true" /> Despesas
            </span>
          </div>
        </div>
      )}

      {type === 'course' && (
        <div className="flex flex-1 flex-col gap-1.5 p-2.5">
          <div className="text-white/40">Módulo 3 · React Avançado</div>
          <div className="flex flex-1 gap-1.5">
            <div className={`relative flex flex-[1.4] items-center justify-center overflow-hidden rounded-md ${soft}`}>
              <Play className={`size-4 ${text}`} fill="currentColor" aria-hidden="true" />
              <div className="absolute inset-x-1.5 bottom-1.5 h-1 overflow-hidden rounded-full bg-white/15">
                <div className={`h-full w-2/3 rounded-full ${strong}`} />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1.5">
              {[true, true, false, false].map((done, index) => (
                <div key={index} className="flex items-center gap-1">
                  {done ? (
                    <CheckCircle2 className={`size-2 shrink-0 ${text}`} aria-hidden="true" />
                  ) : (
                    <Circle className="size-2 shrink-0 text-white/20" aria-hidden="true" />
                  )}
                  <div className={`h-1 flex-1 rounded-full ${done ? 'bg-white/25' : 'bg-white/10'}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 text-white/40">
            <span className={text}>✓</span> Aula 4 de 12 concluída
          </div>
        </div>
      )}
    </div>
  )
}
