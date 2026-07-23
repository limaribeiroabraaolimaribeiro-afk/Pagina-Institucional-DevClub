import {
  Clock,
  CheckCircle2,
  Route,
  Video,
  Radio,
  Users2,
  FolderGit2,
  Rocket,
  GraduationCap,
  Trophy,
  Layers,
  Database,
  Server,
  Code2,
  type LucideIcon,
} from 'lucide-react'

export interface PlatformMetric {
  label: string
  value: number
  suffix?: string
  icon: LucideIcon
}

export const platformMetrics: PlatformMetric[] = [
  { label: 'Estudadas', value: 142, suffix: 'h', icon: Clock },
  { label: 'Projetos concluídos', value: 20, icon: FolderGit2 },
  { label: 'Aulas concluídas', value: 12, suffix: '/24', icon: CheckCircle2 },
  { label: 'Trilhas ativas', value: 3, icon: Route },
]

export interface PlatformStat {
  label: string
  value: string
  progress: number
  icon: LucideIcon
}

export const platformStats: PlatformStat[] = [
  { label: 'Horas estudadas', value: '142h', progress: 72, icon: Clock },
  { label: 'Aulas concluídas', value: '12 de 24', progress: 50, icon: CheckCircle2 },
  { label: 'Trilhas em andamento', value: '3 ativas', progress: 45, icon: Route },
]

export interface CourseInProgress {
  name: string
  icon: LucideIcon
  percent: number
  status: string
}

export const inProgressCourses: CourseInProgress[] = [
  { name: 'Next.js avançado', icon: Layers, percent: 82, status: 'Quase lá' },
  { name: 'API com Node.js', icon: Server, percent: 55, status: 'Em andamento' },
  { name: 'React completo', icon: Code2, percent: 40, status: 'Em andamento' },
  { name: 'Banco de dados', icon: Database, percent: 20, status: 'Começando' },
]

export interface Achievement {
  label: string
  icon: LucideIcon
}

export const achievements: Achievement[] = [
  { label: 'Primeiro projeto publicado', icon: Rocket },
  { label: '100 horas estudadas', icon: Clock },
  { label: 'Trilha concluída', icon: GraduationCap },
  { label: 'Participação em evento', icon: Video },
  { label: 'Portfólio criado', icon: Trophy },
]

export interface FloatingWidget {
  label: string
  value: number
  suffix?: string
  icon: LucideIcon
  accent: 'green' | 'purple'
}

export const floatingWidgets: FloatingWidget[] = [
  { label: 'Horas estudadas', value: 142, suffix: 'h', icon: Clock, accent: 'green' },
  { label: 'Projetos concluídos', value: 20, icon: FolderGit2, accent: 'purple' },
  { label: 'Aulas concluídas', value: 12, suffix: '/24', icon: CheckCircle2, accent: 'green' },
  { label: 'Conquistas', value: achievements.length, icon: Trophy, accent: 'purple' },
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
  photo: string
  online: boolean
}

export const onlineMembers: OnlineMember[] = [
  { photo: '/img/social-proof/student-1.jpg', online: true },
  { photo: '/img/social-proof/student-2.jpg', online: true },
  { photo: '/img/social-proof/student-3.jpg', online: false },
  { photo: '/img/social-proof/student-4.jpg', online: true },
  { photo: '/img/social-proof/student-5.jpg', online: true },
]

export const communityOnlineCount = 2482
