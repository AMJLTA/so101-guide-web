'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface MermaidProps {
  source: string
  caption?: string
  className?: string
}

/**
 * Client-only Mermaid diagram renderer.
 *
 * - Dynamically imports `mermaid` on mount so it never inflates the initial JS
 *   bundle. SSR/SSG produce a code-block fallback that's already readable for
 *   crawlers and no-JS users.
 * - Re-renders when the theme switches (dark/light) so colors stay consistent.
 * - If the `mermaid` package isn't installed (i.e. `pnpm add mermaid` hasn't
 *   been run after applying the patch), we still show the source verbatim so
 *   the page doesn't crash.
 */
export function Mermaid({ source, caption, className }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(`mmd-${Math.random().toString(36).slice(2, 10)}`)
  const { resolvedTheme } = useTheme()
  const [error, setError] = useState<string | null>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let cancelled = false
    const node = containerRef.current
    if (!node) return

    ;(async () => {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === 'dark' ? 'dark' : 'default',
          fontFamily: 'var(--font-geist), system-ui, sans-serif',
          securityLevel: 'loose'
        })
        const { svg } = await mermaid.render(idRef.current, source)
        if (!cancelled && node) {
          node.innerHTML = svg
          setRendered(true)
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error
              ? e.message
              : '無法載入 mermaid。请运行 `pnpm add mermaid` 安装。'
          )
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [source, resolvedTheme])

  return (
    <figure
      className={cn(
        'my-4 overflow-hidden rounded-xl border border-border/60 bg-card/40',
        className
      )}
    >
      <div className="overflow-x-auto px-4 py-5">
        {error ? (
          <pre className="font-mono text-xs text-muted-foreground">{source}</pre>
        ) : (
          <>
            {!rendered && (
              <pre className="font-mono text-xs text-muted-foreground opacity-60">
                {source}
              </pre>
            )}
            <div
              ref={containerRef}
              className={cn(
                'mermaid-host flex items-center justify-center',
                rendered ? '' : 'hidden'
              )}
            />
          </>
        )}
      </div>
      {caption && (
        <figcaption className="border-t border-border/40 bg-background/40 px-4 py-2 text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
      {error && (
        <p className="border-t border-yellow-500/30 bg-yellow-500/5 px-4 py-2 text-[10px] text-yellow-600 dark:text-yellow-400">
          {error}
        </p>
      )}
    </figure>
  )
}
