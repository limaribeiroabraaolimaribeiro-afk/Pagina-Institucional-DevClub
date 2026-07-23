import { useReducedMotion } from '../../hooks/useReducedMotion'

const lines = [
  { angle: -62, length: 46, delay: 0 },
  { angle: -28, length: 52, delay: 0.6 },
  { angle: 8, length: 40, delay: 1.2 },
  { angle: 34, length: 50, delay: 0.3 },
  { angle: 68, length: 44, delay: 0.9 },
  { angle: 118, length: 48, delay: 0.5 },
  { angle: 152, length: 42, delay: 1.1 },
  { angle: -118, length: 46, delay: 0.2 },
]

export function ProjectsEnergyLines() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full opacity-70"
    >
      <defs>
        <linearGradient id="projects-energy-green" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(46,234,83,0.55)" />
          <stop offset="100%" stopColor="rgba(46,234,83,0)" />
        </linearGradient>
        <linearGradient id="projects-energy-purple" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(139,61,255,0.5)" />
          <stop offset="100%" stopColor="rgba(139,61,255,0)" />
        </linearGradient>
      </defs>
      {lines.map((line, index) => {
        const rad = (line.angle * Math.PI) / 180
        const x2 = 100 + Math.cos(rad) * line.length
        const y2 = 100 + Math.sin(rad) * line.length
        return (
          <line
            key={line.angle}
            x1="100"
            y1="100"
            x2={x2}
            y2={y2}
            stroke={`url(#projects-energy-${index % 2 === 0 ? 'green' : 'purple'})`}
            strokeWidth="0.4"
            strokeLinecap="round"
            className={prefersReducedMotion ? undefined : 'animate-pulse'}
            style={
              prefersReducedMotion
                ? { opacity: 0.3 }
                : { animationDuration: '3.6s', animationDelay: `${line.delay}s` }
            }
          />
        )
      })}
    </svg>
  )
}
