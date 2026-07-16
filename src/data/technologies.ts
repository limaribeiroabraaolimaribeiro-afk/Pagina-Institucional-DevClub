export type ChipSize = 'sm' | 'md' | 'lg'

export interface Technology {
  name: string
  size: ChipSize
}

export const technologies: Technology[] = [
  { name: 'JavaScript', size: 'lg' },
  { name: 'TypeScript', size: 'md' },
  { name: 'React', size: 'lg' },
  { name: 'Next.js', size: 'md' },
  { name: 'Node.js', size: 'lg' },
  { name: 'Express', size: 'sm' },
  { name: 'Python', size: 'lg' },
  { name: 'PostgreSQL', size: 'md' },
  { name: 'MongoDB', size: 'sm' },
  { name: 'Docker', size: 'md' },
  { name: 'Git', size: 'sm' },
  { name: 'GitHub', size: 'md' },
  { name: 'AWS', size: 'md' },
  { name: 'Firebase', size: 'sm' },
  { name: 'Tailwind CSS', size: 'lg' },
  { name: 'React Native', size: 'md' },
  { name: 'UI/UX', size: 'sm' },
  { name: 'SQL', size: 'md' },
  { name: 'Power BI', size: 'sm' },
  { name: 'N8N', size: 'sm' },
  { name: 'Claude', size: 'md' },
  { name: 'Inteligência Artificial', size: 'lg' },
]
