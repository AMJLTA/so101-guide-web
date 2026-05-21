'use client'

import { useEffect, useRef, useState } from 'react'

/** SSR-safe mounted flag */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

/** 当元素进入视口时返回 true */
export function useInView<T extends Element>(
  options: IntersectionObserverInit & { once?: boolean } = {}
) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const { once = true, threshold = 0.15, ...rest } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { threshold, ...rest }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold, rest])

  return { ref, inView } as const
}

/** 全局鼠标位置（ref 版，不触发 re-render） */
export function useMousePositionRef() {
  const ref = useRef({ x: 0, y: 0, vx: 0, vy: 0 })
  useEffect(() => {
    let lastX = 0
    let lastY = 0
    const onMove = (e: MouseEvent) => {
      ref.current.vx = e.clientX - lastX
      ref.current.vy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      ref.current.x = e.clientX
      ref.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return ref
}

/** 是否启用精细指针（桌面 + 鼠标） */
export function useHasFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setFine(mq.matches)
    const onChange = () => setFine(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return fine
}

/** 用户是否偏好减少动效 */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mq.matches)
    const onChange = () => setReduce(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduce
}
