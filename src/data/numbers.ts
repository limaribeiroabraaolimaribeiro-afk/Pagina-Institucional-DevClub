export interface StatItem {
  value: number
  suffix: string
  label: string
  isPercentage?: boolean
}

export const statItems: StatItem[] = [
  { value: 30000, suffix: '+', label: 'Alunos transformados' },
  { value: 1000, suffix: '+', label: 'Empresas parceiras' },
  { value: 400, suffix: '+', label: 'Mentores especialistas' },
  { value: 94, suffix: '%', label: 'Conquistaram novas oportunidades', isPercentage: true },
]
