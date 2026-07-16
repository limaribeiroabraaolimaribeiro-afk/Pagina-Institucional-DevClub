export type ProjectLevel = 'Iniciante' | 'Intermediário' | 'Avançado'
export type ProjectSize = 'sm' | 'md' | 'lg'

export interface Project {
  slug: string
  name: string
  description: string
  stack: string[]
  level: ProjectLevel
  size: ProjectSize
}

export const projects: Project[] = [
  {
    slug: 'ecommerce-nextjs',
    name: 'E-commerce com Next.js',
    description: 'Loja virtual completa com carrinho, checkout e painel administrativo.',
    stack: ['Next.js', 'TypeScript', 'Stripe'],
    level: 'Avançado',
    size: 'lg',
  },
  {
    slug: 'dashboard-analytics',
    name: 'Dashboard Analytics',
    description: 'Painel de métricas em tempo real com gráficos interativos.',
    stack: ['React', 'Recharts', 'Node.js'],
    level: 'Intermediário',
    size: 'md',
  },
  {
    slug: 'api-rest-node',
    name: 'API REST com Node.js',
    description: 'API escalável com autenticação, testes e documentação.',
    stack: ['Node.js', 'Express', 'PostgreSQL'],
    level: 'Intermediário',
    size: 'sm',
  },
  {
    slug: 'marketplace',
    name: 'Marketplace',
    description: 'Plataforma multi-vendedor com gestão de pedidos e pagamentos.',
    stack: ['React', 'Node.js', 'MongoDB'],
    level: 'Avançado',
    size: 'md',
  },
  {
    slug: 'clone-netflix',
    name: 'Clone da Netflix',
    description: 'Streaming com catálogo dinâmico, player e listas personalizadas.',
    stack: ['React', 'Tailwind CSS', 'Firebase'],
    level: 'Intermediário',
    size: 'lg',
  },
  {
    slug: 'app-tarefas',
    name: 'Aplicativo de tarefas',
    description: 'Organização pessoal com lembretes e sincronização em nuvem.',
    stack: ['React Native', 'TypeScript'],
    level: 'Iniciante',
    size: 'sm',
  },
  {
    slug: 'chatbot-ia',
    name: 'Chatbot com IA',
    description: 'Assistente conversacional integrado a modelos de linguagem.',
    stack: ['Python', 'Claude', 'FastAPI'],
    level: 'Avançado',
    size: 'md',
  },
  {
    slug: 'sistema-financeiro',
    name: 'Sistema financeiro',
    description: 'Controle de receitas, despesas e relatórios consolidados.',
    stack: ['React', 'Node.js', 'SQL'],
    level: 'Intermediário',
    size: 'sm',
  },
  {
    slug: 'plataforma-cursos',
    name: 'Plataforma de cursos',
    description: 'Ambiente de ensino com trilhas, progresso e certificados.',
    stack: ['Next.js', 'PostgreSQL', 'Docker'],
    level: 'Avançado',
    size: 'md',
  },
]
