export interface Tutor {
  slug: string
  name: string
  role: string
  company: string
  specialty: string
  experience: string
  technologies: string[]
  photo: string
  socials: {
    linkedin?: string
    github?: string
    instagram?: string
  }
}

export const tutors: Tutor[] = [
  {
    slug: 'rodolfo-mori',
    name: 'Rodolfo Mori',
    role: 'Head de Engenharia',
    company: 'DevClub',
    specialty: 'Arquitetura de software e liderança técnica',
    experience: '12+ anos de experiência',
    technologies: ['Node.js', 'AWS', 'Liderança técnica'],
    photo: '/img/tutors/rodolfo-mori.jpg',
    socials: { linkedin: '#', github: '#' },
  },
  {
    slug: 'george-almeida',
    name: 'George Almeida',
    role: 'Tech Lead',
    company: 'DevClub',
    specialty: 'Full Stack e sistemas escaláveis',
    experience: '9+ anos de experiência',
    technologies: ['React', 'Node.js', 'Kubernetes'],
    photo: '/img/tutors/george-almeida.jpg',
    socials: { linkedin: '#', github: '#' },
  },
  {
    slug: 'andrey-santos',
    name: 'Andrey Santos',
    role: 'Engenheiro de Software',
    company: 'DevClub',
    specialty: 'Back-end e arquitetura de APIs',
    experience: '7+ anos de experiência',
    technologies: ['Node.js', 'PostgreSQL', 'Docker'],
    photo: '/img/tutors/andrey-santos.jpg',
    socials: { linkedin: '#', github: '#', instagram: '#' },
  },
  {
    slug: 'gabriel-costa',
    name: 'Gabriel Costa',
    role: 'Desenvolvedor Mobile',
    company: 'DevClub',
    specialty: 'React Native e aplicações móveis',
    experience: '6+ anos de experiência',
    technologies: ['React Native', 'TypeScript', 'Expo'],
    photo: '/img/tutors/gabriel-costa.jpg',
    socials: { linkedin: '#', github: '#' },
  },
  {
    slug: 'fernanda-rocha',
    name: 'Fernanda Rocha',
    role: 'Engenheira de Dados',
    company: 'DevClub',
    specialty: 'Dados, Python e inteligência artificial',
    experience: '8+ anos de experiência',
    technologies: ['Python', 'SQL', 'Machine Learning'],
    photo: '/img/tutors/fernanda-rocha.jpg',
    socials: { linkedin: '#', github: '#' },
  },
  {
    slug: 'agustinho-martins',
    name: 'Agustinho Martins',
    role: 'Especialista em Cloud',
    company: 'DevClub',
    specialty: 'AWS, DevOps e infraestrutura',
    experience: '10+ anos de experiência',
    technologies: ['AWS', 'Terraform', 'CI/CD'],
    photo: '/img/tutors/agustinho-martins.jpg',
    socials: { linkedin: '#', github: '#' },
  },
  {
    slug: 'henrique-souza',
    name: 'Henrique Souza',
    role: 'Desenvolvedor Front-end',
    company: 'DevClub',
    specialty: 'React, Next.js e interfaces modernas',
    experience: '5+ anos de experiência',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    photo: '/img/tutors/henrique-souza.jpg',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    slug: 'marcio-oliveira',
    name: 'Márcio Oliveira',
    role: 'Especialista em Segurança',
    company: 'DevClub',
    specialty: 'Cibersegurança e proteção de aplicações',
    experience: '11+ anos de experiência',
    technologies: ['Segurança ofensiva', 'OWASP', 'Pentest'],
    photo: '/img/tutors/marcio-oliveira.jpg',
    socials: { linkedin: '#', github: '#' },
  },
  {
    slug: 'juliana-ferreira',
    name: 'Juliana Ferreira',
    role: 'Product Designer',
    company: 'DevClub',
    specialty: 'UI/UX e experiência do usuário',
    experience: '7+ anos de experiência',
    technologies: ['Figma', 'UI/UX', 'Design System'],
    photo: '/img/tutors/juliana-ferreira.jpg',
    socials: { linkedin: '#', github: '#', instagram: '#' },
  },
  {
    slug: 'mateus-ribeiro',
    name: 'Mateus Ribeiro',
    role: 'Engenheiro Full Stack',
    company: 'DevClub',
    specialty: 'Node.js, React e bancos de dados',
    experience: '8+ anos de experiência',
    technologies: ['Node.js', 'React', 'PostgreSQL'],
    photo: '/img/tutors/mateus-ribeiro.jpg',
    socials: { linkedin: '#', github: '#' },
  },
]
