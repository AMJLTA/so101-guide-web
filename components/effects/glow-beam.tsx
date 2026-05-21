import { cn } from '@/lib/utils'

interface GlowBeamProps {
  className?: string
}

/** 区段之间的发光分割线 */
export function GlowBeam({ className }: GlowBeamProps) {
  return (
    <div className={cn('relative my-12', className)} aria-hidden>
      <div className="glow-beam w-full origin-center" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_20px] shadow-primary animate-slow-pulse" />
      </div>
    </div>
  )
}
