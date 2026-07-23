import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface Particle {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  color: string
}

const GREEN = '46, 234, 83'
const PURPLE = '139, 61, 255'

export function ProjectsParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isTablet = useMediaQuery('(max-width: 1023px)')
  const isMobile = useMediaQuery('(max-width: 639px)')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particleCount = prefersReducedMotion ? 0 : isMobile ? 10 : isTablet ? 24 : 46

    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles: Particle[] = []
    let animationFrame = 0

    function resize() {
      if (!canvas) return
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function createParticles() {
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.6,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.09,
        color: Math.random() > 0.45 ? GREEN : PURPLE,
      }))
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      for (const particle of particles) {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < -10) particle.x = width + 10
        if (particle.x > width + 10) particle.x = -10
        if (particle.y < -10) particle.y = height + 10
        if (particle.y > height + 10) particle.y = -10

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particle.color}, 0.55)`
        ctx.fill()
      }

      animationFrame = requestAnimationFrame(draw)
    }

    resize()
    createParticles()

    if (!prefersReducedMotion && particleCount > 0) {
      draw()
    }

    const handleResize = () => {
      resize()
      createParticles()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)
    }
  }, [prefersReducedMotion, isTablet, isMobile])

  return <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
}
