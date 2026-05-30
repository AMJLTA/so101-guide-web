/**
 * Interactive lesson card schema.
 *
 * A Lesson is the play-mode counterpart to a Chapter article. Where the
 * article is long-form reference (good for review), the lesson is a sequence
 * of bite-sized Cards, each one ~30-60 seconds, designed to teach a true
 * beginner through interaction rather than reading.
 *
 * Card types are intentionally small in number. The constraint forces clear
 * pedagogy — each card does ONE thing.
 */

export type CardType =
  | 'intro'      // hero text + advance button. Hooks attention.
  | 'reveal'     // mystery prompt → click → reveal. Builds suspense.
  | 'choice'     // 2-4 options, branches to feedback. Diagnostic.
  | 'mcq'        // single-correct multiple choice with explanation. Quiz.
  | 'match'      // pair items (term ↔ definition). Vocabulary.
  | 'viz'        // Mermaid diagram or image with caption. Visual.
  | 'numeric'    // type a number, check against expected. Math/recall.
  | 'command'    // shell command + expected output + optional tip. Practical.
  | 'recap'      // bullet summary of what was learned. Memory.
  | 'completion' // celebration screen, unlock next chapter.

export interface BaseCard {
  /** Stable id used for tracking which cards a user has seen/completed. */
  id: string
  type: CardType
}

export interface IntroCard extends BaseCard {
  type: 'intro'
  emoji?: string
  title?: string
  /** Markdown body. */
  body: string
  /** Custom CTA. Defaults to "继续". */
  cta?: string
}

export interface RevealCard extends BaseCard {
  type: 'reveal'
  /** Setup shown immediately. */
  prompt: string
  /** Button label that triggers the reveal. */
  revealCta: string
  /** Hidden content (markdown), shown after click. */
  reveal: string
  /** Follow-on CTA label after the reveal. Defaults to "继续". */
  followCta?: string
}

export interface ChoiceOption {
  id: string
  label: string
  emoji?: string
  /** Feedback shown after selection (markdown). */
  feedback: string
  /** If exactly one option is marked `correct: true`, choosing wrong gets
   *  feedback but the user can still proceed — we never block on a soft choice.
   *  If no option is correct, this is a pure branching question.
   */
  correct?: boolean
}

export interface ChoiceCard extends BaseCard {
  type: 'choice'
  question: string
  options: ChoiceOption[]
}

export interface MCQOption {
  id: string
  label: string
}

export interface MCQCard extends BaseCard {
  type: 'mcq'
  question: string
  options: MCQOption[]
  correctOptionId: string
  /** Markdown shown after answer (whether right or wrong). */
  explanation: string
}

export interface MatchPair {
  left: string
  right: string
}

export interface MatchCard extends BaseCard {
  type: 'match'
  prompt: string
  pairs: MatchPair[]
}

export interface VizCard extends BaseCard {
  type: 'viz'
  title?: string
  /** Optional prose above the diagram (markdown). */
  body?: string
  /** Either provide Mermaid source... */
  mermaid?: string
  /** ...or a static image. */
  imageSrc?: string
  imageAlt?: string
  caption?: string
}

export interface NumericCard extends BaseCard {
  type: 'numeric'
  question: string
  /** Expected numeric answer. */
  answer: number
  /** Optional tolerance for floating-point answers. Defaults to 0. */
  tolerance?: number
  /** Optional hint, revealable. */
  hint?: string
  /** Markdown shown after the user submits (right or wrong). */
  explanation: string
  /** Optional unit suffix shown next to the input (e.g. "对" for sample pairs). */
  unit?: string
}

export interface CommandCard extends BaseCard {
  type: 'command'
  /** Title above the code block. */
  title: string
  /** Optional intro paragraph (markdown). */
  intro?: string
  /** Short description shown above the code. */
  description: string
  /** The command to display. */
  code: string
  /** Language hint (defaults to "bash"). */
  language?: string
  /** Optional "you should see" content shown in a green callout. */
  expectedOutput?: string
  /** Optional pro tip in a yellow callout. */
  tip?: string
  /** Optional warning in a red callout. */
  warning?: string
}

export interface RecapCard extends BaseCard {
  type: 'recap'
  title: string
  bullets: string[]
}

export interface CompletionCard extends BaseCard {
  type: 'completion'
  title: string
  body: string
  /** If set, "下一课" button links to that chapter's play route. */
  nextChapterId?: number
}

export type Card =
  | IntroCard
  | RevealCard
  | ChoiceCard
  | MCQCard
  | MatchCard
  | VizCard
  | NumericCard
  | CommandCard
  | RecapCard
  | CompletionCard

export interface Lesson {
  chapterId: number
  title: string
  estimatedMinutes: number
  cards: Card[]
}
