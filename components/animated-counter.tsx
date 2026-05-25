'use client'

import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/hooks'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

/**
 * Renders a number and (optionally) animates it from 0 -> value the first time
 * it scrolls into view.
 *
 * Why the initial state is the final value:
 *   - Old behaviour was `useState(0)`, which made SSR / no-JS / SEO crawlers see
 *     "0 章 / 0 分钟 / 0%" because the animation only kicked in after JS hydrated
 *     AND the IntersectionObserver fired. That was a real bug on the live site.
 *   - We now render `value` on the server and on initial client paint. If the
 *     element happens to already be in the viewport at mount (hero stats), we
 *     skip the animation entirely to avoid a value -> 0 -> value flicker. For
 *     stats deeper in the page, the user is scrolling in fresh, so resetting
 *     to 0 and animating up reads naturally.
 */
export function AnimatedCounter({
  value,
  duration = 1500,
  prefix = '',
  suffix = '',
  decimals = 0,
  className
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(value)
  const ref = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (reduce) return
    const node = ref.current
    if (!node) return

    // If the element is already in the viewport at mount (e.g. hero stats above
    // the fold), don't reset to 0 — that would cause a brief flash. Just leave
    // the final value rendered.
    const rect = node.getBoundingClientRect()
    const alreadyVisible =
      rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth
    if (alreadyVisible) {
      triggered.current = true
      return
    }

    let raf = 0
    const animate = () => {
      setDisplay(0)
      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(eased * value)
        if (progress < 1) raf = requestAnimationFrame(tick)
        else setDisplay(value)
      }
      raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !triggered.current) {
            triggered.current = true
            animate()
          }
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(node)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [value, duration, reduce])

  const formatted = display.toFixed(decimals)
  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
