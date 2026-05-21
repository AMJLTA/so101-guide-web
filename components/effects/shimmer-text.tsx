import { cn } from '@/lib/utils'

interface ShimmerTextProps {
  children: React.ReactNode
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'div'
}

export function ShimmerText({ children, className, as = 'span' }: ShimmerTextProps) {
  const Tag = as as 'span'
  return <Tag className={cn('shimmer-text', className)}>{children}</Tag>
}
