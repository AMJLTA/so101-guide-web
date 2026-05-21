'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SpotlightCard({ className, children, ...props }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      className={cn('spotlight-card', className)}
      onMouseMove={onMove}
      {...props}
    >
      {children}
    </div>
  )
}
