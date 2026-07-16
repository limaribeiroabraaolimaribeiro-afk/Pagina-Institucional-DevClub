import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function CursorGlow() {
  const prefersReducedMotion = useReducedMotion()
  const isCoarsePointer = useMediaQuery('(pointer: coarse)')
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { stiffness: 120, damping: 25, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 120, damping: 25, mass: 0.6 })

  const disabled = prefersReducedMotion || isCoarsePointer

  useEffect(() => {
    if (disabled) return

    function handleMove(event: PointerEvent) {
      x.set(event.clientX)
      y.set(event.clientY)
    }

    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [disabled, x, y])

  if (disabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
      style={{
        translateX: springX,
        translateY: springY,
        background:
          'radial-gradient(circle, rgba(46,234,83,0.10) 0%, rgba(139,61,255,0.06) 45%, transparent 70%)',
      }}
    />
  )
}
