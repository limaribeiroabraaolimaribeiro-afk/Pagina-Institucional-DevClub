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
  drift: number
}

const GREEN = '46, 234, 83'
const PURPLE = '139, 61, 255'

function isLowPowerDevice() {
  const cores = navigator.hardwareConcurrency ?? 8
  return cores <= 4
}

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 767px)')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const lightMode = isMobile || isLowPowerDevice()
    const particleCount = prefersReducedMotion ? 0 : lightMode ? 45 : 110

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles: Particle[] = []
    let animationFrame = 0
    let mouseX = 0
    let mouseY = 0
    let hasMouse = false

    function resize() {
      if (!canvas) return
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function createParticles() {
      particles = Array.from({ length: particleCount }, () => {
        const isGreen = Math.random() > 0.45
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.6 + 0.6,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          color: isGreen ? GREEN : PURPLE,
          drift: Math.random() * Math.PI * 2,
        }
      })
    }

    function handlePointerMove(event: PointerEvent) {
      const bounds = canvas!.getBoundingClientRect()
      mouseX = event.clientX - bounds.left
      mouseY = event.clientY - bounds.top
      hasMouse = true
    }

    function handlePointerLeave() {
      hasMouse = false
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height * 0.42

      for (const particle of particles) {
        particle.drift += 0.004
        particle.x += particle.speedX + Math.sin(particle.drift) * 0.05
        particle.y += particle.speedY + Math.cos(particle.drift) * 0.05

        if (hasMouse) {
          const dx = particle.x - mouseX
          const dy = particle.y - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const influence = 140
          if (dist < influence && dist > 0) {
            const force = (influence - dist) / influence
            particle.x += (dx / dist) * force * 1.4
            particle.y += (dy / dist) * force * 1.4
          }
        }

        if (particle.x < -20) particle.x = width + 20
        if (particle.x > width + 20) particle.x = -20
        if (particle.y < -20) particle.y = height + 20
        if (particle.y > height + 20) particle.y = -20

        const distToCenter = Math.hypot(particle.x - centerX, particle.y - centerY)
        const alpha = Math.max(0.15, 1 - distToCenter / (width * 0.7))

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particle.color}, ${alpha})`
        ctx.fill()
      }

      if (!lightMode) {
        ctx.strokeStyle = `rgba(${GREEN}, 0.05)`
        ctx.lineWidth = 1
        for (let i = 0; i < particles.length; i += 1) {
          for (let j = i + 1; j < particles.length; j += 1) {
            const a = particles[i]
            const b = particles[j]
            const dist = Math.hypot(a.x - b.x, a.y - b.y)
            if (dist < 90) {
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
        }
      }

      animationFrame = requestAnimationFrame(draw)
    }

    resize()
    createParticles()

    if (!prefersReducedMotion) {
      draw()
      canvas.addEventListener('pointermove', handlePointerMove)
      canvas.addEventListener('pointerleave', handlePointerLeave)
    } else {
      ctx.clearRect(0, 0, width, height)
    }

    const handleResize = () => {
      resize()
      createParticles()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [prefersReducedMotion, isMobile])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  )
}
