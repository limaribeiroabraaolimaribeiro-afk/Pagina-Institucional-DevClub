export interface JourneyStep {
  title: string
  description: string
  code: string
}

export const journeySteps: JourneyStep[] = [
  {
    title: 'Primeiro contato',
    description: 'Você conhece o DevClub e descobre o caminho ideal para sua carreira em tecnologia.',
    code: 'const student = new Developer();',
  },
  {
    title: 'Primeira linha de código',
    description: 'Os primeiros passos na programação, sem pressa e sem complicação.',
    code: 'console.log("Hello, World!");',
  },
  {
    title: 'Formação',
    description: 'Trilhas completas do zero ao avançado, no seu ritmo de estudo.',
    code: 'student.learn("fullstack");',
  },
  {
    title: 'Projetos reais',
    description: 'Aplicação prática dos conhecimentos em projetos usados no mercado.',
    code: 'project.build({ real: true });',
  },
  {
    title: 'Portfólio',
    description: 'Um portfólio sólido que demonstra suas habilidades para recrutadores.',
    code: 'portfolio.push(project);',
  },
  {
    title: 'Mentoria',
    description: 'Orientação de especialistas para acelerar sua evolução técnica.',
    code: 'mentor.review(student.code);',
  },
  {
    title: 'Entrevista',
    description: 'Preparação completa para processos seletivos reais.',
    code: 'if (interview.passed) next();',
  },
  {
    title: 'Contratação',
    description: 'O início da sua nova carreira como desenvolvedor de tecnologia.',
    code: 'deployment.status = "successful";',
  },
]
