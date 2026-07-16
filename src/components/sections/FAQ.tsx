import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqItems } from '../../data/faq'
import { SectionTitle } from '../ui/SectionTitle'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const headerRefs = useRef<Array<HTMLButtonElement | null>>([])

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index))
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = faqItems.length - 1
    let nextIndex: number | null = null

    if (event.key === 'ArrowDown') nextIndex = index === lastIndex ? 0 : index + 1
    if (event.key === 'ArrowUp') nextIndex = index === 0 ? lastIndex : index - 1
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = lastIndex

    if (nextIndex !== null) {
      event.preventDefault()
      headerRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <section className="relative bg-void py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes" />

        <div className="mt-12 flex flex-col gap-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const headerId = `faq-header-${index}`

            return (
              <div key={item.question} className="overflow-hidden rounded-xl border border-white/10 bg-card">
                <h3>
                  <button
                    ref={(el) => {
                      headerRefs.current[index] = el
                    }}
                    id={headerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-ink transition-colors hover:text-green sm:text-base"
                  >
                    {item.question}
                    <Plus
                      className={`size-4 shrink-0 text-purple-bright transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
