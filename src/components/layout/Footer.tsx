import { ArrowRight } from 'lucide-react'
import { footerLinks } from '../../data/nav'
import { GithubIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from '../ui/SocialIcons'

const socials = [
  { label: 'Instagram', icon: InstagramIcon, href: '#' },
  { label: 'YouTube', icon: YoutubeIcon, href: '#' },
  { label: 'LinkedIn', icon: LinkedinIcon, href: '#' },
  { label: 'GitHub', icon: GithubIcon, href: '#' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_2fr_1fr]">
          <div className="flex flex-col gap-4">
            <img src="/img/brand/devclub-logo.png" alt="DevClub" className="h-8 w-auto" />
            <p className="max-w-xs text-sm text-muted">
              Formações completas em programação para transformar sua carreira em tecnologia, do zero ao mercado.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 text-muted transition-all duration-200 hover:border-green/50 hover:text-green"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="mb-4 text-sm font-semibold text-ink">{category}</h3>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted transition-colors hover:text-green">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-ink">Newsletter</h3>
            <p className="text-sm text-muted">Receba novidades e conteúdos sobre tecnologia.</p>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-card p-1.5"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Seu e-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Seu e-mail"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink placeholder:text-muted focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Inscrever-se na newsletter"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green text-void transition-transform hover:scale-105"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DevClub. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-green">
              Termos de uso
            </a>
            <a href="#" className="transition-colors hover:text-green">
              Política de privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
