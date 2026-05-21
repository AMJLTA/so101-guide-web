import { Bot } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-primary/20" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
            <Bot className="h-8 w-8 text-primary" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">正在加载…</p>
      </div>
    </div>
  )
}
