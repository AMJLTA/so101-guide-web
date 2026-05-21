export interface Chapter {
  id: number
  title: string
  titleEn: string
  description: string
  duration: string
  status: 'completed' | 'in-progress' | 'locked'
  progress: number
  objectives: string[]
  principles: string[]
  steps: Step[]
  commands: Command[]
  checkpoints: string[]
  errors: ErrorItem[]
}

export interface Step {
  title: string
  content: string
}

export interface Command {
  description: string
  code: string
}

export interface ErrorItem {
  error: string
  cause: string
  solution: string
  command?: string
}

export type DiagnosticCategory =
  | 'environment'
  | 'hardware'
  | 'data'
  | 'training'
  | 'inference'
  | 'misc'

export interface DiagnosticResult {
  error: string
  cause: string
  solution: string
  command?: string
  nextStep: string
  category?: DiagnosticCategory
  related?: string[]
}

export interface ChatMessageSource {
  title: string
  url: string
  type: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date | string
  /** assistant-only: 引用源（章节、错误、术语链接） */
  sources?: ChatMessageSource[]
  /** assistant-only: 命中的意图，用于调试 */
  intent?: string
}

export interface GlossaryTerm {
  term: string
  termEn?: string
  definition: string
  category: 'concept' | 'algorithm' | 'hardware' | 'framework' | 'data'
  related?: string[]
}

export interface Resource {
  title: string
  description: string
  url: string
  category: 'paper' | 'docs' | 'video' | 'community' | 'hardware' | 'code'
  tags?: string[]
}
