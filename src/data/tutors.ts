export interface Tutor {
  name: string
  role: string
  company: string
  specialty: string
  socials: {
    linkedin?: string
    github?: string
    instagram?: string
  }
}

export const tutors: Tutor[] = [
  {
    name: 'Rodolfo Mori',
    role: 'Head de Engenharia',
    company: 'DevClub',
    specialty: 'Arquitetura Full Stack',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'George Almeida',
    role: 'Tech Lead',
    company: 'Nubank',
    specialty: 'Back-end & APIs',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Andrey Santos',
    role: 'Engenheiro de Software',
    company: 'Google',
    specialty: 'React & Performance',
    socials: { linkedin: '#', github: '#', instagram: '#' },
  },
  {
    name: 'Gabriel Costa',
    role: 'Desenvolvedor Mobile',
    company: 'iFood',
    specialty: 'React Native',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Fernanda Rocha',
    role: 'Engenheira de Dados',
    company: 'Ambev',
    specialty: 'Ciência de Dados',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Agustinho Reis',
    role: 'Especialista em Cloud',
    company: 'Amazon',
    specialty: 'AWS & DevOps',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Henrique Alves',
    role: 'Desenvolvedor Front-end',
    company: 'Stone',
    specialty: 'UI/UX & Acessibilidade',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    name: 'Márcio Teixeira',
    role: 'Engenheiro de IA',
    company: 'Microsoft',
    specialty: 'Inteligência Artificial',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Juliana Prado',
    role: 'Product Engineer',
    company: 'QuintoAndar',
    specialty: 'Full Stack JavaScript',
    socials: { linkedin: '#', github: '#', instagram: '#' },
  },
  {
    name: 'Mateus Vieira',
    role: 'Desenvolvedor Back-end',
    company: '99',
    specialty: 'Node.js & Bancos de Dados',
    socials: { linkedin: '#', github: '#' },
  },
]
