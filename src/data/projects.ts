export type ProjectLevel = 'Iniciante' | 'Intermediário' | 'Avançado'
export type ProjectSize = 'principal' | 'featured' | 'medio' | 'menor'
export type ProjectAccent = 'green' | 'purple'
export type ProjectPreviewType =
  | 'ecommerce'
  | 'dashboard'
  | 'terminal'
  | 'marketplace'
  | 'streaming'
  | 'todo'
  | 'chat'
  | 'finance'
  | 'course'

export interface Project {
  slug: string
  name: string
  description: string
  stack: string[]
  level: ProjectLevel
  size: ProjectSize
  accent: ProjectAccent
  preview: ProjectPreviewType
}

export const projects: Project[] = [
  {
    slug: 'ecommerce-nextjs',
    name: 'E-commerce com Next.js',
    description: 'Loja virtual completa com carrinho, checkout e painel administrativo.',
    stack: ['Next.js', 'TypeScript', 'Stripe'],
    level: 'Avançado',
    size: 'principal',
    accent: 'green',
    preview: 'ecommerce',
  },
  {
    slug: 'dashboard-analytics',
    name: 'Dashboard Analytics',
    description: 'Métricas em tempo real com gráficos interativos.',
    stack: ['React', 'Recharts', 'Node.js'],
    level: 'Intermediário',
    size: 'featured',
    accent: 'purple',
    preview: 'dashboard',
  },
  {
    slug: 'api-rest-node',
    name: 'API REST com Node.js',
    description: 'API escalável com autenticação e testes.',
    stack: ['Node.js', 'Express', 'PostgreSQL'],
    level: 'Intermediário',
    size: 'medio',
    accent: 'purple',
    preview: 'terminal',
  },
  {
    slug: 'marketplace',
    name: 'Marketplace',
    description: 'Plataforma multi-vendedor com gestão de pedidos.',
    stack: ['React', 'Node.js', 'MongoDB'],
    level: 'Avançado',
    size: 'medio',
    accent: 'green',
    preview: 'marketplace',
  },
  {
    slug: 'clone-netflix',
    name: 'Clone da Netflix',
    description: 'Streaming com catálogo dinâmico e player integrado.',
    stack: ['React', 'Tailwind CSS', 'Firebase'],
    level: 'Intermediário',
    size: 'medio',
    accent: 'purple',
    preview: 'streaming',
  },
  {
    slug: 'app-tarefas',
    name: 'Aplicativo de tarefas',
    description: 'Organização pessoal com lembretes e sincronização.',
    stack: ['React Native', 'TypeScript'],
    level: 'Iniciante',
    size: 'menor',
    accent: 'green',
    preview: 'todo',
  },
  {
    slug: 'chatbot-ia',
    name: 'Chatbot com IA',
    description: 'Assistente conversacional com IA integrada.',
    stack: ['Python', 'Claude', 'FastAPI'],
    level: 'Avançado',
    size: 'menor',
    accent: 'purple',
    preview: 'chat',
  },
  {
    slug: 'sistema-financeiro',
    name: 'Sistema financeiro',
    description: 'Controle de receitas, despesas e relatórios.',
    stack: ['React', 'Node.js', 'SQL'],
    level: 'Intermediário',
    size: 'menor',
    accent: 'green',
    preview: 'finance',
  },
  {
    slug: 'plataforma-cursos',
    name: 'Plataforma de cursos',
    description: 'Ambiente de ensino com trilhas e certificados.',
    stack: ['Next.js', 'PostgreSQL', 'Docker'],
    level: 'Avançado',
    size: 'menor',
    accent: 'purple',
    preview: 'course',
  },
]
