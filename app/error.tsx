'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error)
    }
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
          Runtime Error
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">出错了</h1>
        <p className="mt-3 text-muted-foreground">
          页面渲染时遇到了问题。你可以尝试重新加载，或者回到首页。
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-xs text-muted-foreground/60">
            错误编号: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset} size="lg">
            <RotateCcw className="mr-1.5 h-4 w-4" />
            重新加载
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="mr-1.5 h-4 w-4" />
              回到首页
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
