import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems } from '../../data/nav'
import { Button } from '../ui/Button'
import { assetUrl } from '../../lib/assetUrl'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'border-b border-white/10 bg-void/80 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <img src={assetUrl('/img/brand/devclub-logo.png')} alt="DevClub" className="h-7 w-auto sm:h-8" />
        </a>

        <nav aria-label="Navegação principal" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-linear-to-r from-green to-purple transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Button href="#area-do-aluno" variant="ghost" size="md">
            Área do aluno
          </Button>
          <Button href="#quero-ser-aluno" variant="primary" size="md" showArrow>
            Quero ser aluno
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="flex size-11 items-center justify-center rounded-full border border-white/10 text-ink xl:hidden"
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-white/10 bg-void/95 backdrop-blur-xl xl:hidden"
          >
            <nav aria-label="Navegação mobile" className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-muted transition-colors hover:bg-white/5 hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-3 px-3">
                <Button href="#area-do-aluno" variant="secondary" size="md" className="w-full justify-center">
                  Área do aluno
                </Button>
                <Button href="#quero-ser-aluno" variant="primary" size="md" showArrow className="w-full justify-center">
                  Quero ser aluno
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
