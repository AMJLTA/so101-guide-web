'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Keeps <html lang="..."> in sync with the current route.
 *
 * Next.js App Router does not let segment-level layouts mutate the root <html>
 * element, so we patch it client-side on every navigation. The initial value
 * set in app/layout.tsx (currently "zh-CN") is overwritten on hydration.
 *
 * Returns null — this component renders nothing.
 */
export function HtmlLangSync() {
  const pathname = usePathname()

  useEffect(() => {
    const isJa = pathname?.startsWith('/ja') ?? false
    const target = isJa ? 'ja-JP' : 'zh-CN'
    if (typeof document !== 'undefined' && document.documentElement.lang !== target) {
      document.documentElement.lang = target
    }
  }, [pathname])

  return null
}
