import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { clsx } from 'clsx'

interface GlowCardProps {
  children: ReactNode
  accent?: 'green' | 'purple'
  className?: string
  tilt?: boolean
}

const accentBorder: Record<NonNullable<GlowCardProps['accent']>, string> = {
  green: 'hover:border-green/50',
  purple: 'hover:border-purple/50',
}

const accentGlow: Record<NonNullable<GlowCardProps['accent']>, string> = {
  green: 'from-green/25',
  purple: 'from-purple/25',
}

export function GlowCard({ children, accent = 'green', className, tilt = true }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 })

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!tilt || !ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    x.set((event.clientX - bounds.left) / bounds.width)
    y.set((event.clientY - bounds.top) / bounds.height)
  }

  function handleMouseLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      className={clsx(
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-card',
        'transition-colors duration-300',
        accentBorder[accent],
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={clsx(
          'pointer-events-none absolute -inset-1 rounded-2xl bg-radial opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100',
          accentGlow[accent],
          'to-transparent',
        )}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
