'use client'

import { useEffect, useRef } from 'react'
import { useHasFinePointer, usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface InteractiveGridProps {
  className?: string
  /** 网格尺寸 px */
  size?: number
  /** 光圈半径 px */
  radius?: number
}

/** 跟随鼠标显示发光圆圈的网格背景 */
export function InteractiveGrid({
  className,
  size = 56,
  radius = 220
}: InteractiveGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isFine = useHasFinePointer()
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (!isFine || reduce) return
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [isFine, reduce])

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
      style={
        {
          '--mx': '50%',
          '--my': '50%',
          '--grid-size': `${size}px`,
          '--grid-radius': `${radius}px`,
          maskImage:
            'radial-gradient(var(--grid-radius) circle at var(--mx) var(--my), black 0%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(var(--grid-radius) circle at var(--mx) var(--my), black 0%, transparent 80%)',
          backgroundImage: `
            linear-gradient(to right, oklch(from var(--primary) l c h / 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(from var(--primary) l c h / 0.4) 1px, transparent 1px)
          `,
          backgroundSize: `var(--grid-size) var(--grid-size)`
        } as React.CSSProperties
      }
    />
  )
}
