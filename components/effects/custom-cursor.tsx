'use client'

import { useEffect, useRef, useState } from 'react'
import { useHasFinePointer, usePrefersReducedMotion } from '@/lib/hooks'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const isFine = useHasFinePointer()
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!isFine || reduceMotion) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { x: mouse.x, y: mouse.y }

    let raf = 0

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
    }

    const loop = () => {
      // 环缓慢跟随
      ringPos.x += (mouse.x - ringPos.x) * 0.18
      ringPos.y += (mouse.y - ringPos.y) * 0.18
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (!target.closest) return
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
      )
      setHovering(!!interactive)
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const onEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [isFine, reduceMotion])

  if (!isFine || reduceMotion) return null

  return (
    <>
      <div ref={dotRef} className="custom-cursor">
        <div className="custom-cursor-dot" />
      </div>
      <div ref={ringRef} className={`custom-cursor-ring ${hovering ? 'hover' : ''}`} />
    </>
  )
}
