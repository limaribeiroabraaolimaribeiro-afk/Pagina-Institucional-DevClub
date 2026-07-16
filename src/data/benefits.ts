import { Users, FolderGit2, MessagesSquare, Briefcase, Award, type LucideIcon } from 'lucide-react'

export interface Benefit {
  title: string
  description: string
  icon: LucideIcon
  accent: 'green' | 'purple'
}

export const benefits: Benefit[] = [
  {
    title: 'Mentoria com especialistas',
    description: 'Aprenda com profissionais que atuam em grandes empresas de tecnologia.',
    icon: Users,
    accent: 'green',
  },
  {
    title: 'Projetos reais e portfólio',
    description: 'Construa um portfólio sólido com projetos práticos do mercado.',
    icon: FolderGit2,
    accent: 'purple',
  },
  {
    title: 'Comunidade ativa',
    description: 'Troque experiências e evolua junto com milhares de outros alunos.',
    icon: MessagesSquare,
    accent: 'green',
  },
  {
    title: 'Carreira e empregabilidade',
    description: 'Suporte para currículo, portfólio e processos seletivos.',
    icon: Briefcase,
    accent: 'purple',
  },
  {
    title: 'Certificado reconhecido',
    description: 'Comprove suas habilidades com certificado validado pelo mercado.',
    icon: Award,
    accent: 'green',
  },
]
