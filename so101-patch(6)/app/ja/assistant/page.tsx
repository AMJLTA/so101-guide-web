'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  AlertTriangle,
  ArrowUpRight,
  Bot,
  BookOpen,
  Library,
  Plus,
  Send,
  Sparkles,
  Terminal,
  Trash2,
  User,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ChatMessageRenderer } from '@/components/chat-message-renderer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { glossaryJa } from '@/lib/glossary-ja'
import { errorDatabaseJa, aiResponsesJa } from '@/lib/course-data-ja'
import type { ChatMessage, ChatMessageSource } from '@/lib/types'

const STORAGE_KEY = 'so101-assistant-ja-history-v1'

const suggestedQuestions = [
  'SO101 のキャリブレーション方法は？',
  'ACT と BC の違いは？',
  'データ収集のコマンドを教えて',
  'CUDA out of memory の対処は？',
  'ロボットアームが推論時に振動する',
  '学習中に loss が NaN になる',
  'Action Chunking とは？',
  'ACT 学習の起動方法は？'
]

const welcomeMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `こんにちは。**SO101 模倣学習アシスタント** です 🤖

このアシスタントはサイト内の **章コンテンツ**、**エラーベース**、**用語集**、**リソース** を索引化したナレッジベースで動作しています。

- 入力されたキーワードから関連する用語・エラー・FAQ を引き当てて回答します
- すべて手元のブラウザで動き、外部 API は使用しません
- 完整なエラースタックや実行コマンドを添えていただくほど、精度が上がります

> 例：「**ACT とは？**」「**CUDA out of memory の対処は？**」`,
  timestamp: new Date().toISOString()
}

const typeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  chapter: BookOpen,
  objective: BookOpen,
  principle: Sparkles,
  step: BookOpen,
  command: Terminal,
  checkpoint: BookOpen,
  error: AlertTriangle,
  glossary: Library,
  faq: Sparkles,
  resource: ArrowUpRight
}

const typeLabel: Record<string, string> = {
  chapter: '章',
  objective: '学習目標',
  principle: '原理',
  step: '手順',
  command: 'コマンド',
  checkpoint: 'チェックポイント',
  error: 'エラー',
  glossary: '用語',
  faq: 'FAQ',
  resource: 'リソース'
}

/**
 * Lightweight JP assistant engine.
 * Looks up the query against JP glossary / errorDatabase / aiResponses with simple
 * substring matching. A richer engine (matching the CN tokenizer + scorer) will land
 * in a follow-up round.
 */
function composeResponseJa(query: string): {
  content: string
  sources: ChatMessageSource[]
} {
  const q = query.trim().toLowerCase()
  if (!q) {
    return { content: 'もう少し詳しく教えてください。', sources: [] }
  }

  const sources: ChatMessageSource[] = []
  const fragments: string[] = []

  // 1. FAQ (aiResponses) lookup
  for (const [key, response] of Object.entries(aiResponsesJa)) {
    if (q.includes(key) || key.includes(q)) {
      fragments.push(response)
      break
    }
  }

  // 2. Glossary lookup
  const glossHit = glossaryJa.find(
    (g) =>
      g.term.toLowerCase().includes(q) ||
      q.includes(g.term.toLowerCase()) ||
      g.termEn?.toLowerCase().includes(q)
  )
  if (glossHit && fragments.length === 0) {
    fragments.push(`**${glossHit.term}** (${glossHit.termEn ?? ''})\n\n${glossHit.definition}`)
    sources.push({
      title: glossHit.term,
      url: `/ja/glossary#${encodeURIComponent(glossHit.term)}`,
      type: 'glossary'
    })
  }

  // 3. Error database lookup
  for (const [key, err] of Object.entries(errorDatabaseJa)) {
    if (q.includes(key.toLowerCase()) || err.error.toLowerCase().includes(q)) {
      fragments.push(
        `### ${err.error}\n\n**原因**：${err.cause}\n\n**対処**：${err.solution}${
          err.command ? `\n\n\`\`\`bash\n${err.command}\n\`\`\`` : ''
        }\n\n> 次の一手：${err.nextStep}`
      )
      sources.push({
        title: err.error,
        url: `/ja/diagnose?q=${encodeURIComponent(err.error)}`,
        type: 'error'
      })
      break
    }
  }

  if (fragments.length === 0) {
    return {
      content: `「${query}」に直接該当する項目はナレッジベースで見つかりませんでした。

以下を試してみてください：
- **[トラブル診断](/ja/diagnose?q=${encodeURIComponent(query)})** でエラーを検索
- **[用語集](/ja/glossary)** で概念を確認
- **[学習パス](/ja/learn)** で関連章を参照

または、表現を変えてもう一度ご質問ください。`,
      sources: []
    }
  }

  return {
    content: fragments.join('\n\n---\n\n'),
    sources
  }
}

export default function AssistantPageJa() {
  return (
    <Suspense fallback={null}>
      <AssistantContent />
    </Suspense>
  )
}

function AssistantContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: ChatMessage[] = JSON.parse(stored)
        if (parsed.length > 0) {
          setMessages(parsed)
        }
      }
    } catch {
      // ignore
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!loaded) return
    if (messages.length === 1 && messages[0].id === 'welcome') {
      localStorage.removeItem(STORAGE_KEY)
      return
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // storage full
    }
  }, [messages, loaded])

  useEffect(() => {
    if (initialQuery) {
      setTimeout(() => handleSend(initialQuery), 200)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery])

  useEffect(() => {
    const scroll = scrollAreaRef.current?.querySelector(
      '[data-radix-scroll-area-viewport]'
    )
    if (scroll) {
      scroll.scrollTop = scroll.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async (override?: string) => {
    const text = (override ?? input).trim()
    if (!text || isTyping) return

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    await new Promise((resolve) => setTimeout(resolve, 450))

    const result = composeResponseJa(text)

    setMessages((prev) => [
      ...prev,
      {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: result.content,
        timestamp: new Date().toISOString(),
        sources: result.sources
      }
    ])
    setIsTyping(false)
  }

  const handleNewChat = () => {
    setMessages([welcomeMessage])
    localStorage.removeItem(STORAGE_KEY)
    toast.success('新しい会話を開始しました')
    inputRef.current?.focus()
  }

  const handleClearHistory = () => {
    setMessages([welcomeMessage])
    localStorage.removeItem(STORAGE_KEY)
    toast.success('履歴をクリアしました')
  }

  const showSuggestions = useMemo(
    () => messages.filter((m) => m.role === 'user').length === 0,
    [messages]
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-border/60">
                <Bot className="h-6 w-6 text-primary" />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-success ring-2 ring-background">
                  <Sparkles className="h-2 w-2 text-success-foreground" />
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight">
                  <span className="gradient-text">AI アシスタント</span>
                </h1>
                <p className="text-xs text-muted-foreground">
                  ローカルナレッジベース · 引用リンク · 履歴保存
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" onClick={handleNewChat}>
                <Plus className="mr-1 h-3.5 w-3.5" />
                新しい会話
              </Button>
              {messages.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="履歴をクリア"
                  onClick={handleClearHistory}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </div>
          </div>

          <Card className="flex flex-1 flex-col overflow-hidden border-border/60 bg-card/40">
            <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-5 sm:px-6">
              <div className="space-y-5">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 ring-1 ring-border/60">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-2xl bg-secondary/50 px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
                        <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                          検索中
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {showSuggestions && (
              <div className="border-t border-border/50 px-4 py-3 sm:px-6">
                <p className="mb-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3" />
                  クイック質問
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleSend(q)}
                      className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <CardContent className="border-t border-border/50 p-3 sm:p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='ご質問をどうぞ（例: "学習中に loss が NaN になるのはなぜ？"）'
                  disabled={isTyping}
                  className="h-11"
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  size="lg"
                  className="h-11 px-4 glow-primary"
                  aria-label="送信"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                <Zap className="h-3 w-3" />
                ブラウザ内のみで動作 · バックエンド・API キー不要
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ring-border/60',
          isUser
            ? 'bg-secondary'
            : 'bg-gradient-to-br from-primary/15 to-accent/15'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4 text-primary" />
        )}
      </div>
      <div className={cn('max-w-[85%] space-y-2', isUser && 'items-end')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3',
            isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-foreground'
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
          ) : (
            <ChatMessageRenderer content={message.content} />
          )}
        </div>

        {!isUser && message.sources && message.sources.length > 0 && (
          <SourceList sources={message.sources} />
        )}
      </div>
    </div>
  )
}

function SourceList({ sources }: { sources: ChatMessageSource[] }) {
  return (
    <div className="space-y-1.5">
      <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        <Sparkles className="h-2.5 w-2.5" />
        出典 · {sources.length}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((src) => (
          <SourceChip key={src.url} source={src} />
        ))}
      </div>
    </div>
  )
}

function SourceChip({ source }: { source: ChatMessageSource }) {
  const Icon = typeIcon[source.type] ?? BookOpen
  const label = typeLabel[source.type] ?? source.type
  const external = /^https?:\/\//.test(source.url)
  const className =
    'group inline-flex max-w-full items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground'

  const inner = (
    <>
      <Icon className="h-3 w-3 shrink-0" />
      <Badge
        variant="outline"
        className="h-4 border-border/40 bg-background/40 px-1 text-[9px] uppercase tracking-wider"
      >
        {label}
      </Badge>
      <span className="max-w-[180px] truncate">{source.title}</span>
      <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
    </>
  )

  if (external) {
    return (
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {inner}
      </a>
    )
  }
  return (
    <Link href={source.url} className={className}>
      {inner}
    </Link>
  )
}
