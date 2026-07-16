import { Clock, CheckCircle2, Route, Video, Radio, Users2, type LucideIcon } from 'lucide-react'

export interface PlatformStat {
  label: string
  value: string
  progress: number
  icon: LucideIcon
}

export const platformStats: PlatformStat[] = [
  { label: 'Horas estudadas', value: '128h', progress: 72, icon: Clock },
  { label: 'Aulas concluídas', value: '86 de 120', progress: 68, icon: CheckCircle2 },
  { label: 'Trilhas em andamento', value: '3 ativas', progress: 45, icon: Route },
]

export interface PlatformChannel {
  label: string
  detail: string
  icon: LucideIcon
}

export const platformChannels: PlatformChannel[] = [
  { label: 'Eventos ao vivo', detail: 'Toda quarta às 20h', icon: Video },
  { label: 'Grupos de estudo', detail: '42 grupos ativos agora', icon: Users2 },
  { label: 'Canais de discussão', detail: '#javascript, #react, #carreira', icon: Radio },
]

export interface OnlineMember {
  name: string
  online: boolean
}

export const onlineMembers: OnlineMember[] = [
  { name: 'Ana', online: true },
  { name: 'Bruno', online: true },
  { name: 'Carla', online: false },
  { name: 'Diego', online: true },
  { name: 'Elisa', online: true },
]
