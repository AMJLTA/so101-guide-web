'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

/** 点击会扩散波纹的按钮 */
export function RippleButton({ className, children, onClick, ...props }: RippleButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current
    if (btn) {
      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      const span = document.createElement('span')
      span.className = 'ripple'
      span.style.width = `${size}px`
      span.style.height = `${size}px`
      span.style.left = `${x}px`
      span.style.top = `${y}px`
      btn.appendChild(span)
      setTimeout(() => span.remove(), 700)
    }
    onClick?.(e)
  }

  return (
    <button
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
