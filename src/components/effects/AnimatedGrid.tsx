import { clsx } from 'clsx'

interface AnimatedGridProps {
  accent?: 'green' | 'purple'
  className?: string
}

const accentColor: Record<NonNullable<AnimatedGridProps['accent']>, string> = {
  green: 'rgba(46,234,83,0.16)',
  purple: 'rgba(139,61,255,0.18)',
}

export function AnimatedGrid({ accent = 'green', className }: AnimatedGridProps) {
  return (
    <div aria-hidden="true" className={clsx('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
        }}
      />
      <div
        className="absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${accentColor[accent]} 0%, transparent 65%)` }}
      />
    </div>
  )
}
