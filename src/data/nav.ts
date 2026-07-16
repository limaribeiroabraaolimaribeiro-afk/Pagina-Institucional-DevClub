export interface NavItem {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Formações', href: '#formacoes' },
  { label: 'Faculdade', href: '#faculdade' },
  { label: 'Para empresas', href: '#empresas' },
  { label: 'Conteúdos', href: '#conteudos' },
  { label: 'Planos', href: '#planos' },
  { label: 'Sobre nós', href: '#sobre' },
]

export const footerLinks = {
  Formações: ['Full Stack', 'Front-end', 'Back-end', 'Mobile', 'Inteligência Artificial'],
  Conteúdos: ['Blog', 'YouTube', 'Podcast', 'Materiais gratuitos'],
  Empresa: ['Sobre nós', 'Carreiras', 'Para empresas', 'Imprensa'],
  Recursos: ['Central de ajuda', 'Comunidade', 'Área do aluno', 'Certificados'],
}
