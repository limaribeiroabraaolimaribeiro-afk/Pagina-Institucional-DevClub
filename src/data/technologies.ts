import { Atom, Binary, BrainCircuit, Cloud, Hexagon, Braces, type LucideIcon } from 'lucide-react'

export type ChipSize = 'sm' | 'md' | 'lg'
export type TechCategory = 'frontend' | 'backend' | 'cloud' | 'data' | 'ai'

export interface Technology {
  name: string
  size: ChipSize
  category: TechCategory
}

export interface FeaturedTechnology {
  name: string
  description: string
  icon: LucideIcon
  category: TechCategory
  span?: 2
}

export const featuredTechnologies: FeaturedTechnology[] = [
  { name: 'JavaScript', description: 'A base de tudo na web', icon: Braces, category: 'frontend', span: 2 },
  { name: 'React', description: 'Interfaces modernas e reativas', icon: Atom, category: 'frontend' },
  { name: 'Node.js', description: 'JavaScript no servidor', icon: Hexagon, category: 'backend' },
  { name: 'Python', description: 'Dados, automação e IA', icon: Binary, category: 'data' },
  { name: 'AWS', description: 'Infraestrutura em nuvem', icon: Cloud, category: 'cloud' },
  {
    name: 'Inteligência Artificial',
    description: 'Modelos e integrações reais',
    icon: BrainCircuit,
    category: 'ai',
    span: 2,
  },
]

export const technologies: Technology[] = [
  { name: 'TypeScript', size: 'md', category: 'frontend' },
  { name: 'Next.js', size: 'md', category: 'frontend' },
  { name: 'Express', size: 'sm', category: 'backend' },
  { name: 'PostgreSQL', size: 'md', category: 'data' },
  { name: 'MongoDB', size: 'sm', category: 'data' },
  { name: 'Docker', size: 'md', category: 'cloud' },
  { name: 'Git', size: 'sm', category: 'backend' },
  { name: 'GitHub', size: 'md', category: 'backend' },
  { name: 'Firebase', size: 'sm', category: 'cloud' },
  { name: 'Tailwind CSS', size: 'lg', category: 'frontend' },
  { name: 'React Native', size: 'md', category: 'frontend' },
  { name: 'UI/UX', size: 'sm', category: 'frontend' },
  { name: 'SQL', size: 'md', category: 'data' },
  { name: 'Power BI', size: 'sm', category: 'data' },
  { name: 'N8N', size: 'sm', category: 'ai' },
  { name: 'Claude', size: 'md', category: 'ai' },
]
