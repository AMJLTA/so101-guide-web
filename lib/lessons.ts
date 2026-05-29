import type { Lesson } from './lesson-types'

/**
 * Interactive lessons keyed by chapter id.
 *
 * Authoring rules I follow:
 *   - Talk to the reader as "你". Never "用户". Never "学习者".
 *   - One new idea per card. If a card has 2 new ideas, split it.
 *   - Use everyday metaphors before any technical term. The term is the LAST
 *     thing the card introduces, not the first.
 *   - Emoji is fine in moderation. They function as visual anchors that the
 *     eye returns to.
 *   - When a beginner gets something wrong, never write "错了" — instead
 *     acknowledge why it's a reasonable guess, then steer.
 */

export const lessons: Record<number, Lesson> = {
  1: {
    chapterId: 1,
    title: '什么是模仿学习',
    estimatedMinutes: 7,
    cards: [
      {
        id: 'c1-01-hook',
        type: 'intro',
        emoji: '🦾',
        title: '想象一下',
        body: '你刚刚买了一台机械臂。\n\n它就放在桌上。\n\n你按下电源。**绿灯亮了**。',
        cta: '然后呢？'
      },
      {
        id: 'c1-02-it-cant',
        type: 'reveal',
        prompt: '你说: 「机械臂，给我倒杯水。」\n\n它会怎么反应？',
        revealCta: '看它怎么回应',
        reveal:
          '## 🦾 ⚙️ Beep.\n\n> 「我什么都没学过。」\n\n这是真的。一台刚出厂的机械臂只是**一堆能动的金属**。要让它做事，你得**教**它。\n\n问题是 —— 怎么教？',
        followCta: '我来想想 →'
      },
      {
        id: 'c1-03-which-path',
        type: 'choice',
        question: '你打算怎么教这个机械臂倒水？',
        options: [
          {
            id: 'manual',
            emoji: '📖',
            label: 'A. 给它写一本超详细的说明书',
            feedback:
              '哈哈，等你写完都退休了。\n\n光是「杯子在哪」就有 1000 种位置。**光线变了、桌上有杂物、杯子被人碰了**，每种都得写规则。\n\n这就是 1990 年代以前机器人专家做的事 —— 写不完。\n\n我们看 B 选项怎么样。'
          },
          {
            id: 'demo',
            emoji: '👋',
            label: 'B. 你亲手演示给它看，让它学',
            feedback:
              '✨ **就是这个思路。**\n\n你不告诉它规则，你**示范**给它看。演示 50 次「怎么倒水」，让它自己悟。\n\n这个方法有个名字 ——',
            correct: true
          },
          {
            id: 'chatgpt',
            emoji: '🤖',
            label: 'C. 我问 ChatGPT 帮我教',
            feedback:
              '哈哈想得美。ChatGPT 不会动你家机械臂。\n\n但你的方向是对的 —— **让机器自己学** 比 **写规则** 强。看 B 选项。'
          }
        ]
      },
      {
        id: 'c1-04-define-il',
        type: 'reveal',
        prompt: '把这个名字钉死在脑子里：',
        revealCta: '记下它',
        reveal:
          '## 模仿学习 \n### Imitation Learning (IL)\n\n> 给机器看很多「人怎么做」的演示，让它自己学到一个**策略**。\n\n**策略 (policy)** 是个翻译器：\n\n```\n看到当前情况  →  输出下一步该怎么动\n```\n\n听起来简单。但马上你会发现一个**致命问题**...',
        followCta: '致命问题是什么 →'
      },
      {
        id: 'c1-05-the-trap',
        type: 'choice',
        question:
          '你演示了 5 次倒水，机器人学会了。\n\n第 6 次，你**把杯子往左挪了 0.5 厘米**。\n\n猜猜会怎样？',
        options: [
          {
            id: 'perfect',
            label: '🎯 完美完成',
            feedback:
              '可惜不是。\n\n机器人从来没见过「杯子稍微偏一点」的画面 —— 它会觉得场景有点不对劲，做出来的动作会**偏一点点**。'
          },
          {
            id: 'wobble',
            label: '🤏 动作稍微歪了一点',
            feedback:
              '对了。但故事**还没完**。\n\n这「稍微歪了」会触发一个**连锁反应**。揭晓 →',
            correct: true
          },
          {
            id: 'crash',
            label: '💥 完全失败',
            feedback:
              '有点夸张。\n\n第 6 次还不至于完全失败。但**第 30 次**呢？很可能。原因是 ——'
          }
        ]
      },
      {
        id: 'c1-06-compounding',
        type: 'reveal',
        prompt: '这个连锁反应有个名字。它是模仿学习**最大的敌人**。',
        revealCta: '揭晓敌人的名字',
        reveal:
          '## 复合误差 🌨️\n### Compounding Error\n\n```\n第 6 次  → 偏 0.5 度\n第 7 次  → 偏 1.5 度  (因为画面比第 6 次更不对)\n第 8 次  → 偏 4   度\n第 9 次  → 完全跑偏\n```\n\n**误差像雪球一样越滚越大。**\n\n好消息：现代算法 (ACT、Diffusion Policy) 都有办法治它。后面 7 章你会一点点学会怎么对付它。',
        followCta: '看一张图整理一下 →'
      },
      {
        id: 'c1-07-pipeline-viz',
        type: 'viz',
        title: '一张图看清整个流程',
        body: '别想着记，看图就行。所有花哨算法都在做同一件事 ——',
        mermaid: `flowchart LR
    A["👤 你 (演示)"] -->|"录 50 次"| B["📦 数据集"]
    B -->|"训练"| C["🧠 策略"]
    C -->|"输出动作"| D["🦾 机械臂"]
    D -.->|"新情况"| C
    style A fill:#7c5cff,stroke:#7c5cff,color:#fff
    style C fill:#22c55e,stroke:#22c55e,color:#fff
    style D fill:#0ea5e9,stroke:#0ea5e9,color:#fff`,
        caption: '人产生演示 → 数据集训练出策略 → 策略指挥机械臂 → 机械臂遇到新情况 → 喂回策略。整个 IL 都是这个循环。'
      },
      {
        id: 'c1-08-vocab',
        type: 'match',
        prompt: '速记 3 个词。把左边和右边连起来：',
        pairs: [
          { left: '状态 s', right: '机械臂现在的关节角度' },
          { left: '动作 a', right: '下一刻关节要去的角度' },
          { left: '策略 π', right: '看到 s 就输出 a 的翻译器' }
        ]
      },
      {
        id: 'c1-09-numeric',
        type: 'numeric',
        question:
          'SO101 机械臂有 **6 个关节**。\n\n你以 **30 fps** 录一段 **10 秒** 的演示。\n\n这段演示包含多少个 (s, a) 样本对？',
        answer: 300,
        unit: '对',
        hint: '帧率 × 秒数 = 总帧数。每一帧就是一个 (s, a) 对。',
        explanation:
          '## ✅ 30 × 10 = **300 对**\n\n顺便说一下:\n\n- 每对的总维度 = 6 + 6 = **12 维**\n- 整段用 float32 存 = 300 × 12 × 4 = **14.4 KB**\n\n**小到不可思议吧？** 所以 LeRobot 几千条演示也只占几百 MB —— 真正占空间的是**相机视频帧**。'
      },
      {
        id: 'c1-10-bc-vs-act',
        type: 'mcq',
        question: '复合误差这个雪球，**怎么治**？',
        options: [
          {
            id: 'more-data',
            label: '采更多数据，演示一万次'
          },
          {
            id: 'predict-chunks',
            label: '让策略一次预测一**段**动作（不是一步），靠未来动作的一致性消化误差'
          },
          {
            id: 'just-restart',
            label: '出错就重启机械臂'
          },
          {
            id: 'use-llm',
            label: '让 ChatGPT 实时控制它'
          }
        ],
        correctOptionId: 'predict-chunks',
        explanation:
          '## 一次预测一段动作\n\n这就是 **ACT (Action Chunking Transformer)** 的核心思路：\n\n```\nBC:  看一帧 → 出一步动作 → 出错就累积\nACT: 看一帧 → 出未来 100 步动作 → 段内自洽\n```\n\n后面**第 7 章** 我们专门讲 ACT。**先记住这个名字就行**，原理慢慢消化。'
      },
      {
        id: 'c1-11-recap',
        type: 'recap',
        title: '🧠 本课你已经学会了:',
        bullets: [
          '🎯 **模仿学习** = 给机器看演示，让它学策略',
          '📖 你不用写规则，机器自己悟',
          '⚠️ **复合误差** = 误差像雪球越滚越大 —— BC 的最大敌人',
          '🧊 **ACT** 通过「一次预测一段动作」治雪球',
          '📐 **状态 s** = 关节角度  ·  **动作 a** = 下一刻角度  ·  **策略 π** = 翻译器'
        ]
      },
      {
        id: 'c1-12-completion',
        type: 'completion',
        title: '🎉 第 1 课通关',
        body:
          '你已经搞懂了模仿学习是什么、为什么会失败、为什么需要 ACT。\n\n下一课我们打开 **SO101 的硬件** —— 看 Leader 臂和 Follower 臂是怎么生成「演示数据」的。\n\n继续吗？',
        nextChapterId: 2
      }
    ]
  }
}

/**
 * Returns the lesson for a chapter id, or null if no interactive lesson is
 * authored yet. Page should fall back to the article view in that case.
 */
export function getLesson(chapterId: number): Lesson | null {
  return lessons[chapterId] ?? null
}

/**
 * Chapter ids that have a play-mode lesson available. Used by the chapter
 * cards on /learn to decide whether to show the "互动课" CTA.
 */
export function hasLesson(chapterId: number): boolean {
  return chapterId in lessons
}
