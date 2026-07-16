export interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  rating: number
  timeToHire: string
}

export const featuredTestimonial = {
  name: 'Lucas Martins',
  role: 'Desenvolvedor Front-end',
  company: 'Stone',
  thumbnail: '/img/testimonials/testimonial-video.png',
  quote:
    'Depois de entrar para o DevClub, parei de estudar sem direção. Consegui montar meu portfólio, participar de processos seletivos e conquistar minha primeira oportunidade como desenvolvedor.',
}

export const testimonials: Testimonial[] = [
  {
    name: 'Camila Souza',
    role: 'Desenvolvedora Back-end',
    company: 'Nubank',
    quote: 'A mentoria fez toda a diferença. Em poucos meses eu já estava aplicando para vagas com confiança.',
    rating: 5,
    timeToHire: '4 meses',
  },
  {
    name: 'Rafael Andrade',
    role: 'Engenheiro Full Stack',
    company: 'iFood',
    quote: 'Os projetos reais do DevClub foram o diferencial no meu portfólio durante as entrevistas.',
    rating: 5,
    timeToHire: '3 meses',
  },
  {
    name: 'Beatriz Lima',
    role: 'Desenvolvedora Mobile',
    company: 'QuintoAndar',
    quote: 'A comunidade ativa me manteve motivada mesmo nos dias mais difíceis de aprendizado.',
    rating: 5,
    timeToHire: '5 meses',
  },
  {
    name: 'Diego Ferreira',
    role: 'Analista de Dados',
    company: 'Ambev',
    quote: 'Saí do zero absoluto para uma vaga CLT em menos de um ano estudando com o DevClub.',
    rating: 4,
    timeToHire: '7 meses',
  },
]
