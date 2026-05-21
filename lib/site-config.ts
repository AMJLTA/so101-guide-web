export const siteConfig = {
  name: 'SO101 Imitation Learning Guide',
  shortName: 'SO101 Guide',
  brand: '绿晋科技',
  brandEn: 'LVJIN ROBOTICS',
  url: 'https://so101.greenjin.tech',
  description:
    '从环境配置到 ACT 模型部署的具身智能实战学习平台 —— 帮助开发者、研究者与爱好者快速掌握 SO101 机械臂的模仿学习全流程。',
  keywords: [
    'SO101',
    'SO100',
    '机械臂',
    '工业机械臂',
    '模仿学习',
    'Imitation Learning',
    'LeRobot',
    'ACT',
    'Action Chunking Transformer',
    '具身智能',
    'Embodied AI',
    'HuggingFace',
    '机器人学习',
    'LVJIN ROBOTICS',
    '绿晋科技'
  ],
  authors: [{ name: '绿晋科技', url: 'https://github.com/AMJLTA' }],
  creator: '绿晋科技',
  links: {
    github: 'https://github.com/AMJLTA/so101-guide-web',
    lerobot: 'https://github.com/huggingface/lerobot',
    huggingface: 'https://huggingface.co/lerobot',
    so101: 'https://github.com/TheRobotStudio/SO-ARM100',
    inquiry: 'mailto:sales@greenjin.tech?subject=SO101%20SERIES%20%E8%AF%A2%E4%BB%B7'
  },
  nav: [
    { href: '/', label: '首页' },
    { href: '/product', label: '产品' },
    { href: '/learn', label: '学习路径' },
    { href: '/diagnose', label: '诊断' },
    { href: '/assistant', label: 'AI 助手' }
  ],
  navExtra: [
    { href: '/glossary', label: '术语表' },
    { href: '/resources', label: '资源中心' },
    { href: '/about', label: '关于' }
  ]
}

/**
 * SO101 SERIES 产品规格
 */
export const productSpecs = {
  series: 'SO101 SERIES',
  tagline: 'HIGH-PERFORMANCE INDUSTRIAL ROBOTIC ARM',
  taglineZh: '高性能工业机械臂',
  /** Hero 产品大图 — 用户右键保存附图到 public/lvjin-so101-hero.png 即可启用 */
  heroImage: '/lvjin-so101-hero.jpeg',
  /** 多视图小图（可选，未提供时用 CSS 占位） */
  views: [
    { label: '正视图', en: 'Front View', src: '/lvjin-so101-view-front.png' },
    { label: '侧视图', en: 'Side View', src: '/lvjin-so101-view-side.png' },
    { label: '后视图', en: 'Rear View', src: '/lvjin-so101-view-rear.png' },
    { label: '顶视图', en: 'Top View', src: '/lvjin-so101-view-top.png' }
  ],
  kpis: [
    { label: '负载', en: 'Payload', value: '10', unit: 'kg' },
    { label: '臂展', en: 'Reach', value: '1010', unit: 'mm' },
    { label: '重复定位精度', en: 'Repeatability', value: '±0.02', unit: 'mm' },
    { label: '防护等级', en: 'Protection', value: 'IP54', unit: '' },
    { label: '安装方式', en: 'Installation', value: '任意角度', unit: '' }
  ],
  features: [
    {
      title: '高精度关节模组',
      titleEn: 'HIGH-PRECISION JOINT MODULE',
      description: '稳定高效',
      detail: '集成谐波减速器与高分辨率编码器，关节精度长期稳定，适合高频高节拍场景。'
    },
    {
      title: '流线型臂身',
      titleEn: 'STREAMLINED ARM DESIGN',
      description: '刚性与美学兼具',
      detail: '一体化铝合金壳体 + CNC 加工，结构刚度高，外形低风阻、易清洁。'
    },
    {
      title: '紧凑腕部设计',
      titleEn: 'COMPACT WRIST DESIGN',
      description: '紧凑高刚性结构',
      detail: '末端腕部高度集成，可承受较大末端扭矩，搭配多种法兰与末端执行器。'
    },
    {
      title: '集成化底座设计',
      titleEn: 'INTEGRATED BASE DESIGN',
      description: '简洁稳定，易于集成',
      detail: '底座融合控制器接口、急停与状态灯，单线接入即可工作，简化产线集成。'
    }
  ],
  industries: [
    { title: '智能制造', icon: 'Factory', desc: '上下料、装配、码垛、检测' },
    { title: '教育科研', icon: 'GraduationCap', desc: '高校实验室、模仿学习、强化学习研究' },
    { title: '物流仓储', icon: 'Truck', desc: '订单拣选、分拣、轻负载搬运' },
    { title: '具身智能', icon: 'Brain', desc: 'ACT/Diffusion Policy/VLA 等策略的实机部署' }
  ]
}

export type SiteConfig = typeof siteConfig
