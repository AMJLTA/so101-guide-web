'use client'

import { useRef } from 'react'
import { useHasFinePointer, usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 磁吸强度（0-1，越大越拉得远） */
  strength?: number
  /** 触发距离 px */
  range?: number
  children: React.ReactNode
}

export function Magnetic({
  strength = 0.4,
  range = 120,
  className,
  children,
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isFine = useHasFinePointer()
  const reduceMotion = usePrefersReducedMotion()

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFine || reduceMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist > range) {
      el.style.transform = ''
      return
    }
    const factor = (1 - dist / range) * strength
    el.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      className={cn('inline-block transition-transform duration-300 ease-out', className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </div>
  )
}
