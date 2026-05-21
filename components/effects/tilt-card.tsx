'use client'

import { useRef } from 'react'
import { useHasFinePointer } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 最大倾斜角度（度） */
  maxTilt?: number
  /** 缩放系数 */
  scale?: number
  /** 是否启用聚光灯 */
  spotlight?: boolean
  children: React.ReactNode
}

export function TiltCard({
  maxTilt = 8,
  scale = 1.02,
  spotlight = true,
  className,
  children,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isFine = useHasFinePointer()

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFine) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - y) * 2 * maxTilt
    const ry = (x - 0.5) * 2 * maxTilt
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
    if (spotlight) {
      el.style.setProperty('--spot-x', `${(e.clientX - rect.left)}px`)
      el.style.setProperty('--spot-y', `${(e.clientY - rect.top)}px`)
    }
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      className={cn('tilt-card', spotlight && 'spotlight-card', className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </div>
  )
}
