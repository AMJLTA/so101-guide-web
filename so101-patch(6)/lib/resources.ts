import type { Resource } from './types'

export const resources: Resource[] = [
  {
    title: 'LeRobot 官方仓库',
    description: 'HuggingFace 官方机器人学习库源代码、文档与示例。',
    url: 'https://github.com/huggingface/lerobot',
    category: 'code',
    tags: ['LeRobot', 'official']
  },
  {
    title: 'SO-ARM100 硬件项目',
    description: 'SO101 机械臂的硬件设计资料：BOM、3D 打印件、装配指南。',
    url: 'https://github.com/TheRobotStudio/SO-ARM100',
    category: 'hardware',
    tags: ['SO101', 'BOM', '3D 打印']
  },
  {
    title: 'ACT 原论文',
    description: 'Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware (Zhao et al. 2023)',
    url: 'https://arxiv.org/abs/2304.13705',
    category: 'paper',
    tags: ['ACT', 'CVAE', '论文']
  },
  {
    title: 'ALOHA 项目主页',
    description: 'ACT 算法首次发布的双臂遥操作平台，了解 Action Chunking 的来龙去脉。',
    url: 'https://tonyzhaozh.github.io/aloha/',
    category: 'paper',
    tags: ['ALOHA', 'ACT']
  },
  {
    title: 'HuggingFace LeRobot 模型库',
    description: '已发布的预训练策略、社区上传的数据集，可直接下载体验。',
    url: 'https://huggingface.co/lerobot',
    category: 'docs',
    tags: ['HuggingFace', '模型', '数据集']
  },
  {
    title: 'LeRobot 入门视频 · Tutorial Series',
    description: 'HuggingFace 官方发布的 LeRobot 快速上手系列视频。',
    url: 'https://www.youtube.com/playlist?list=PL3vV3-eqf-bp9DvB7-EkS8DGHE9pXVKlS',
    category: 'video',
    tags: ['视频', '入门']
  },
  {
    title: 'Discord · HuggingFace 机器人频道',
    description: '官方社区，LeRobot 团队和开发者在这里讨论 issue 与新特性。',
    url: 'https://discord.gg/huggingface',
    category: 'community',
    tags: ['Discord', '社区']
  },
  {
    title: 'OpenAI Cookbook · Robotics',
    description: '关于把 LLM 与机器人结合的实践笔记，含若干策略学习示例。',
    url: 'https://github.com/openai/openai-cookbook',
    category: 'code',
    tags: ['LLM', 'cookbook']
  },
  {
    title: 'DROID 数据集',
    description: '76k 条多任务机械臂遥操作数据，是模仿学习里规模最大的公开数据集之一。',
    url: 'https://droid-dataset.github.io/',
    category: 'docs',
    tags: ['数据集', 'DROID']
  },
  {
    title: 'PyTorch Mixed Precision 指南',
    description: '官方 AMP 教程，显存吃紧时的必读资料。',
    url: 'https://pytorch.org/docs/stable/amp.html',
    category: 'docs',
    tags: ['PyTorch', 'AMP']
  },
  {
    title: 'Hydra 配置文档',
    description: 'LeRobot 用 Hydra 管理配置，理解它能让你写更灵活的训练脚本。',
    url: 'https://hydra.cc/docs/intro/',
    category: 'docs',
    tags: ['Hydra']
  },
  {
    title: 'Weights & Biases (wandb)',
    description: '训练监控、超参对比与模型版本管理利器。',
    url: 'https://wandb.ai/',
    category: 'docs',
    tags: ['wandb', '可视化']
  }
]

export const resourceCategories = [
  { id: 'all', label: '全部' },
  { id: 'paper', label: '论文' },
  { id: 'docs', label: '文档' },
  { id: 'video', label: '视频' },
  { id: 'community', label: '社区' },
  { id: 'hardware', label: '硬件' },
  { id: 'code', label: '代码' }
] as const
