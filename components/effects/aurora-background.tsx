import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  className?: string
  withGrid?: boolean
  intensity?: 'subtle' | 'normal' | 'strong'
}

export function AuroraBackground({
  className,
  withGrid = true,
  intensity = 'normal'
}: AuroraBackgroundProps) {
  const opacityClass =
    intensity === 'subtle'
      ? 'opacity-40'
      : intensity === 'strong'
        ? 'opacity-100'
        : 'opacity-70'

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      <div className={cn('absolute inset-[-20%] aurora', opacityClass)} />
      {withGrid && (
        <div className="absolute inset-0 grid-pattern mask-radial opacity-50" />
      )}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
