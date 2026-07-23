import { useState, type FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { footerLinks } from '../../data/nav'
import { GithubIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from '../ui/SocialIcons'

const socials = [
  { label: 'Instagram', icon: InstagramIcon, href: '#' },
  { label: 'YouTube', icon: YoutubeIcon, href: '#' },
  { label: 'LinkedIn', icon: LinkedinIcon, href: '#' },
  { label: 'GitHub', icon: GithubIcon, href: '#' },
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!emailPattern.test(email)) {
      setStatus('error')
      return
    }
    setStatus('success')
    setEmail('')
  }

  return (
    <footer className="relative border-t border-white/10 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="flex max-w-[240px] flex-col gap-3.5">
            <img
              src="/img/brand/devclub-logo.png"
              alt="DevClub"
              style={{ width: 'auto', height: '28px', maxWidth: '160px' }}
              className="object-contain"
            />
            <p className="text-sm leading-relaxed text-muted">
              A escola de tecnologia que transforma código em carreira.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-full border border-white/10 text-muted transition-all duration-200 hover:border-green/50 hover:text-green"
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8 lg:flex lg:flex-1 lg:justify-end lg:gap-10">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="lg:w-[120px]">
                <h3 className="mb-3.5 text-sm font-bold text-ink">{category}</h3>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted transition-colors duration-200 hover:text-green">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-3 lg:w-[220px]">
              <h3 className="text-sm font-bold text-ink">Newsletter</h3>
              <p className="text-sm text-muted">Novidades sobre tecnologia, direto no seu e-mail.</p>
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-card p-1.5 transition-colors duration-200 focus-within:border-green/50">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Seu e-mail
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      setStatus('idle')
                    }}
                    aria-invalid={status === 'error'}
                    aria-describedby="newsletter-feedback"
                    placeholder="Seu e-mail"
                    className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink placeholder:text-muted focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Inscrever-se na newsletter"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green text-void transition-all duration-200 hover:shadow-[0_0_18px_-4px_rgba(46,234,83,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                  >
                    {status === 'success' ? (
                      <Check className="size-4" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <p id="newsletter-feedback" role="status" className="min-h-[1em] text-xs">
                  {status === 'error' && <span className="text-red-400">Digite um e-mail válido.</span>}
                  {status === 'success' && <span className="text-green">Inscrição confirmada!</span>}
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DevClub. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors duration-200 hover:text-green">
              Termos de uso
            </a>
            <a href="#" className="transition-colors duration-200 hover:text-green">
              Política de privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
