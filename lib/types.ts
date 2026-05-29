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

  // === Rich content (all optional — old chapters still render fine) ===

  /** Long-form Markdown intro shown right after the overview. */
  introduction?: string
  /** Short Markdown blurb explaining "why this matters / so what?". */
  whyItMatters?: string
  /** Glossary terms (matching glossary.term) that get highlighted as chips. */
  keyTerms?: string[]
  /** Mermaid diagrams. Rendered client-side. */
  diagrams?: Diagram[]
  /** Detailed walkthrough with prose, commands, expected output, tips. */
  walkthrough?: WalkthroughStep[]
  /** Common mistakes — symptom / cause / fix triples. */
  pitfalls?: Pitfall[]
  /** Hands-on exercises with optional hint + expected result. */
  exercises?: Exercise[]
  /** Self-check quiz with collapsible answers. */
  selfCheck?: QuizItem[]
  /** External references specific to this chapter. */
  furtherReading?: ReadingLink[]
  /** Short tldr at the bottom. */
  summary?: string
}

export interface Diagram {
  title: string
  /** Raw Mermaid syntax. */
  source: string
  caption?: string
}

export interface WalkthroughStep {
  title: string
  /** Markdown body. */
  body: string
  /** Optional command shown right after the body. */
  command?: { description: string; code: string }
  /** Optional "you should see" block. */
  expectedOutput?: string
  /** Optional pro tip (yellow accent). */
  tip?: string
  /** Optional warning callout (red accent). */
  warning?: string
}

export interface Pitfall {
  /** What the symptom looks like to the user. */
  symptom: string
  /** Why it happens. */
  cause: string
  /** How to fix it. */
  fix: string
}

export interface Exercise {
  title: string
  /** Markdown instructions. */
  instructions: string
  /** Optional hint (collapsed by default). */
  hint?: string
  /** What success looks like. */
  expectedResult?: string
}

export interface QuizItem {
  question: string
  /** Markdown answer (collapsed by default). */
  answer: string
}

export interface ReadingLink {
  title: string
  url: string
  note?: string
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
