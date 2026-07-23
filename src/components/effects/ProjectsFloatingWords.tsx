import type { ReactNode } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { Code2, ShoppingCart, Database, MessageCircle, Play } from 'lucide-react'

type Tier = 'mobile' | 'tablet' | 'desktop'
type WordVariant = 'pill' | 'ghost'
type WordColor = 'green' | 'purple' | 'white'

interface WordDef {
  text: string
  top: string
  left: string
  variant: WordVariant
  color: WordColor
  depth: number
  minTier: Tier
  delay: number
}

const tierOrder: Record<Tier, number> = { mobile: 0, tablet: 1, desktop: 2 }

const words: WordDef[] = [
  { text: 'API REST', top: '18%', left: '7%', variant: 'pill', color: 'green', depth: 0.6, minTier: 'mobile', delay: 0 },
  { text: 'Dashboard', top: '83%', left: '13%', variant: 'pill', color: 'green', depth: 0.5, minTier: 'mobile', delay: 0.05 },
  { text: 'Chatbot IA', top: '77%', left: '76%', variant: 'ghost', color: 'green', depth: 0.75, minTier: 'mobile', delay: 0.1 },
  { text: 'Node.js', top: '58%', left: '89%', variant: 'pill', color: 'purple', depth: 0.65, minTier: 'mobile', delay: 0.15 },
  { text: 'E-commerce', top: '40%', left: '5%', variant: 'pill', color: 'purple', depth: 0.45, minTier: 'mobile', delay: 0.2 },

  { text: 'React', top: '13%', left: '85%', variant: 'ghost', color: 'white', depth: 0.85, minTier: 'tablet', delay: 0.25 },
  { text: 'Next.js', top: '27%', left: '92%', variant: 'ghost', color: 'green', depth: 0.7, minTier: 'tablet', delay: 0.3 },
  { text: 'Marketplace', top: '59%', left: '3%', variant: 'pill', color: 'green', depth: 0.55, minTier: 'tablet', delay: 0.35 },

  { text: 'TypeScript', top: '46%', left: '90%', variant: 'ghost', color: 'purple', depth: 0.8, minTier: 'desktop', delay: 0.4 },
  { text: 'Streaming', top: '74%', left: '9%', variant: 'ghost', color: 'white', depth: 0.4, minTier: 'desktop', delay: 0.45 },
  { text: 'Supabase', top: '55%', left: '48%', variant: 'ghost', color: 'purple', depth: 1.15, minTier: 'desktop', delay: 0.5 },
  { text: 'Deploy', top: '46%', left: '37%', variant: 'ghost', color: 'white', depth: 1.25, minTier: 'desktop', delay: 0.55 },
  { text: 'Mobile App', top: '90%', left: '50%', variant: 'pill', color: 'purple', depth: 0.4, minTier: 'desktop', delay: 0.6 },
  { text: 'Sistema Financeiro', top: '20%', left: '48%', variant: 'ghost', color: 'green', depth: 0.9, minTier: 'desktop', delay: 0.65 },
]

const colorClasses: Record<WordColor, { pill: string; ghost: string }> = {
  green: {
    pill: 'border-green/30 bg-green/10 text-green/90 shadow-[0_0_20px_-8px_rgba(46,234,83,0.5)]',
    ghost: 'text-green/40',
  },
  purple: {
    pill: 'border-purple/30 bg-purple/10 text-purple-bright/90 shadow-[0_0_20px_-8px_rgba(139,61,255,0.5)]',
    ghost: 'text-purple-bright/40',
  },
  white: {
    pill: 'border-white/20 bg-white/5 text-white/80',
    ghost: 'text-white/25',
  },
}

interface IconDef {
  Icon: typeof Code2
  top: string
  left: string
  depth: number
  minTier: Tier
  delay: number
  color: string
}

const icons: IconDef[] = [
  { Icon: Code2, top: '52%', left: '51%', depth: 1.1, minTier: 'desktop', delay: 0.7, color: 'text-white/20' },
  { Icon: ShoppingCart, top: '36%', left: '15%', depth: 0.5, minTier: 'tablet', delay: 0.5, color: 'text-green/30' },
  { Icon: Database, top: '68%', left: '93%', depth: 0.55, minTier: 'tablet', delay: 0.55, color: 'text-purple-bright/30' },
  { Icon: MessageCircle, top: '31%', left: '80%', depth: 0.65, minTier: 'desktop', delay: 0.6, color: 'text-green/25' },
  { Icon: Play, top: '88%', left: '30%', depth: 0.45, minTier: 'mobile', delay: 0.2, color: 'text-purple-bright/25' },
]

interface DepthLayerProps {
  top: string
  left: string
  depth: number
  active: boolean
  delay: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  scrollProgress: MotionValue<number>
  className: string
  children: ReactNode
}

function DepthLayer({
  top,
  left,
  depth,
  active,
  delay,
  mouseX,
  mouseY,
  scrollProgress,
  className,
  children,
}: DepthLayerProps) {
  const x = useTransform(mouseX, (value) => value * depth)
  const y = useTransform([mouseY, scrollProgress], (values) => {
    const [my, sp] = values as [number, number]
    return my * depth + (sp - 0.5) * 30 * depth
  })

  if (!active) return null

  return (
    <motion.div
      style={{ top, left, x, y }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: 0.5 + delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ProjectsFloatingWordsProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  scrollProgress: MotionValue<number>
  tier: Tier
}

export function ProjectsFloatingWords({ mouseX, mouseY, scrollProgress, tier }: ProjectsFloatingWordsProps) {
  return (
    <>
      {words.map((word) => (
        <DepthLayer
          key={word.text}
          top={word.top}
          left={word.left}
          depth={word.depth}
          delay={word.delay}
          active={tierOrder[word.minTier] <= tierOrder[tier]}
          mouseX={mouseX}
          mouseY={mouseY}
          scrollProgress={scrollProgress}
          className={`pointer-events-none absolute whitespace-nowrap select-none ${
            word.variant === 'pill'
              ? `rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm sm:text-[11px] ${colorClasses[word.color].pill}`
              : `text-[11px] font-medium italic tracking-wide sm:text-xs ${colorClasses[word.color].ghost}`
          }`}
        >
          {word.text}
        </DepthLayer>
      ))}

      {icons.map(({ Icon, top, left, depth, minTier, delay, color }, index) => (
        <DepthLayer
          key={index}
          top={top}
          left={left}
          depth={depth}
          delay={delay}
          active={tierOrder[minTier] <= tierOrder[tier]}
          mouseX={mouseX}
          mouseY={mouseY}
          scrollProgress={scrollProgress}
          className="pointer-events-none absolute"
        >
          <Icon className={`size-4 sm:size-5 ${color}`} aria-hidden="true" />
        </DepthLayer>
      ))}
    </>
  )
}
