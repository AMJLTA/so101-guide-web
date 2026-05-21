import { cn } from '@/lib/utils'

interface ConicBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/** 旋转 conic 渐变边框包装器 */
export function ConicBorder({ className, children, ...props }: ConicBorderProps) {
  return (
    <div className={cn('conic-border rounded-2xl', className)} {...props}>
      {children}
    </div>
  )
}
