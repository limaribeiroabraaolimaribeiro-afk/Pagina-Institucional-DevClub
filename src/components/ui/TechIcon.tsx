interface TechIconProps {
  path?: string
  monogram?: string
  hex: string
  className?: string
}

export function TechIcon({ path, monogram, hex, className }: TechIconProps) {
  const color = `#${hex}`

  if (path) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill={color} aria-hidden="true">
        <path d={path} />
      </svg>
    )
  }

  return (
    <span
      className={`flex items-center justify-center text-[9px] font-extrabold tracking-tight ${className ?? ''}`}
      style={{ color }}
      aria-hidden="true"
    >
      {monogram}
    </span>
  )
}
