'use client'

import { useInView } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  /** 进场方向 */
  direction?: 'up' | 'left' | 'right' | 'scale'
  /** 延迟毫秒 */
  delay?: number
  /** 阈值 */
  threshold?: number
  /** 是否只触发一次 */
  once?: boolean
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.15,
  once = true,
  className,
  as = 'div'
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold, once })

  const directionClass =
    direction === 'left'
      ? 'reveal reveal-left'
      : direction === 'right'
        ? 'reveal reveal-right'
        : direction === 'scale'
          ? 'reveal reveal-scale'
          : 'reveal'

  const Tag = as as 'div'

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(directionClass, inView && 'reveal-in', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
