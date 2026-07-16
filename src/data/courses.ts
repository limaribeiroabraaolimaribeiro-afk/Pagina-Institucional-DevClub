import {
  Layers,
  MonitorSmartphone,
  Server,
  Smartphone,
  Atom,
  Hexagon,
  Braces,
  Terminal,
  BrainCircuit,
  Workflow,
  BarChart3,
  PieChart,
  type LucideIcon,
} from 'lucide-react'

export type CourseLevel = 'Iniciante' | 'Intermediário' | 'Avançado'

export interface Course {
  slug: string
  name: string
  description: string
  icon: LucideIcon
  projects: number
  level: CourseLevel
}

export const courses: Course[] = [
  {
    slug: 'full-stack',
    name: 'Full Stack',
    description: 'Front-end e back-end integrados para construir produtos completos do zero.',
    icon: Layers,
    projects: 18,
    level: 'Avançado',
  },
  {
    slug: 'front-end',
    name: 'Front-end',
    description: 'Interfaces modernas, responsivas e acessíveis com as melhores práticas.',
    icon: MonitorSmartphone,
    projects: 14,
    level: 'Intermediário',
  },
  {
    slug: 'back-end',
    name: 'Back-end',
    description: 'APIs robustas, bancos de dados e arquitetura escalável de servidor.',
    icon: Server,
    projects: 12,
    level: 'Intermediário',
  },
  {
    slug: 'mobile',
    name: 'Mobile',
    description: 'Aplicativos nativos e híbridos para iOS e Android em um único código.',
    icon: Smartphone,
    projects: 10,
    level: 'Intermediário',
  },
  {
    slug: 'react',
    name: 'React',
    description: 'Componentização, hooks e ecossistema moderno para interfaces reativas.',
    icon: Atom,
    projects: 16,
    level: 'Intermediário',
  },
  {
    slug: 'node',
    name: 'Node.js',
    description: 'Servidores performáticos com JavaScript no back-end.',
    icon: Hexagon,
    projects: 11,
    level: 'Intermediário',
  },
  {
    slug: 'javascript',
    name: 'JavaScript',
    description: 'A base de tudo: lógica, sintaxe e fundamentos sólidos da linguagem.',
    icon: Braces,
    projects: 20,
    level: 'Iniciante',
  },
  {
    slug: 'python',
    name: 'Python',
    description: 'Sintaxe simples e poder para automação, dados e inteligência artificial.',
    icon: Terminal,
    projects: 15,
    level: 'Iniciante',
  },
  {
    slug: 'ia',
    name: 'Inteligência Artificial',
    description: 'Modelos, prompts e integrações de IA aplicadas a produtos reais.',
    icon: BrainCircuit,
    projects: 9,
    level: 'Avançado',
  },
  {
    slug: 'automacao',
    name: 'Automação',
    description: 'Fluxos automatizados que eliminam tarefas repetitivas com código.',
    icon: Workflow,
    projects: 8,
    level: 'Intermediário',
  },
  {
    slug: 'ciencia-de-dados',
    name: 'Ciência de Dados',
    description: 'Coleta, tratamento e análise de dados para decisões orientadas por dados.',
    icon: BarChart3,
    projects: 10,
    level: 'Avançado',
  },
  {
    slug: 'power-bi',
    name: 'Power BI',
    description: 'Dashboards e relatórios visuais para transformar dados em insights.',
    icon: PieChart,
    projects: 7,
    level: 'Iniciante',
  },
]
