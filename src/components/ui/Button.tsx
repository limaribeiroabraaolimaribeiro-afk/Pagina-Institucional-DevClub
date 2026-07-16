import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, useRef, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'

type CommonProps = {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  showArrow?: boolean
  className?: string
  children: React.ReactNode
}

type ConflictingHandlers = 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingHandlers> & {
    href?: undefined
  }

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, ConflictingHandlers> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClasses: Record<NonNullable<CommonProps['variant']>, string> = {
  primary:
    'bg-green text-void bg-linear-to-r from-green to-green-bright shadow-[0_0_30px_-8px_rgba(46,234,83,0.6)] hover:shadow-[0_0_40px_-6px_rgba(46,234,83,0.8)]',
  secondary:
    'bg-transparent text-ink border border-white/15 hover:border-purple/60 hover:bg-purple/10',
  ghost: 'bg-transparent text-ink hover:text-green',
}

const sizeClasses: Record<NonNullable<CommonProps['size']>, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  showArrow = false,
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  function handleMagneticMove(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    const el = ref.current
    if (!el) return
    const bounds = el.getBoundingClientRect()
    const x = event.clientX - bounds.left - bounds.width / 2
    const y = event.clientY - bounds.top - bounds.height / 2
    el.style.setProperty('--magnet-x', `${x * 0.2}px`)
    el.style.setProperty('--magnet-y', `${y * 0.2}px`)
  }

  function handleMagneticLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--magnet-x', '0px')
    el.style.setProperty('--magnet-y', '0px')
  }

  const sharedClassName = clsx(
    'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold',
    'transition-[box-shadow,border-color,background-color,transform] duration-300 ease-out',
    'translate-x-[var(--magnet-x,0px)] translate-y-[var(--magnet-y,0px)]',
    'focus-visible:outline-offset-4',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  )

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMagneticMove}
        onMouseLeave={handleMagneticLeave}
        whileTap={{ scale: 0.96 }}
        className={sharedClassName}
        {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, ConflictingHandlers>)}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onMouseMove={handleMagneticMove}
      onMouseLeave={handleMagneticLeave}
      whileTap={{ scale: 0.96 }}
      className={sharedClassName}
      {...(rest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingHandlers>)}
    >
      {content}
    </motion.button>
  )
}
