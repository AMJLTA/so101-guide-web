/**
 * Japanese (ja) mirror of site-config.
 *
 * Used by /ja routes. Keeps shape compatible with the original siteConfig so
 * shared components can swap to this at runtime via pathname detection.
 *
 * Brand name is intentionally kept as "LVJIN ROBOTICS" (no Japanese transliteration).
 */

export const siteConfigJa = {
  name: 'SO101 模倣学習ガイド',
  shortName: 'SO101 ガイド',
  brand: 'LVJIN ROBOTICS',
  brandEn: 'LVJIN ROBOTICS',
  url: 'https://so101.greenjin.tech/ja',
  description:
    'SO101 ロボットアームの模倣学習を、環境構築から ACT モデルのデプロイまで一気通貫で習得できる実践ガイドです。開発者・研究者・愛好家の皆さまを対象としています。',
  keywords: [
    'SO101',
    'SO100',
    'ロボットアーム',
    '産業用ロボットアーム',
    '模倣学習',
    'Imitation Learning',
    'LeRobot',
    'ACT',
    'Action Chunking Transformer',
    '身体性 AI',
    'Embodied AI',
    'HuggingFace',
    'ロボット学習',
    'LVJIN ROBOTICS'
  ],
  authors: [{ name: 'LVJIN ROBOTICS', url: 'https://github.com/AMqqqJLTA' }],
  creator: 'LVJIN ROBOTICS',
  links: {
    github: 'https://github.com/jliu44490-create/so101-guide-wed-quanxin',
    lerobot: 'https://github.com/huggingface/lerobot',
    huggingface: 'https://huggingface.co/lerobot',
    so101: 'https://github.com/TheRobotStudio/SO-ARM100',
    inquiry:
      'https://mail.google.com/mail/?view=cm&fs=1&to=jliu44490@gmail.com&su=SO101%20SERIES%20%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B'
  },
  nav: [
    { href: '/ja', label: 'ホーム' },
    { href: '/ja/product', label: '製品' },
    { href: '/ja/learn', label: '学習パス' },
    { href: '/ja/diagnose', label: 'トラブル診断' },
    { href: '/ja/assistant', label: 'AI アシスタント' }
  ],
  navExtra: [
    { href: '/ja/glossary', label: '用語集' },
    { href: '/ja/resources', label: 'リソース' },
    { href: '/ja/about', label: 'プロジェクトについて' }
  ]
}

/**
 * Japanese mirror of productSpecs.
 * Field names kept identical to the Chinese version so the JP product page can
 * be a near-1:1 fork with import swapped.
 */
export const productSpecsJa = {
  series: 'LVJIN SERIES',
  tagline: 'HIGH-PERFORMANCE INDUSTRIAL ROBOTIC ARM',
  taglineZh: '高性能産業用ロボットアーム',
  heroImage: '/lvjin-so101-hero.jpeg',
  views: [
    { label: '正面ビュー', en: 'Front View', src: '/lvjin-so101-view-front.jpeg' },
    { label: '側面ビュー', en: 'Side View', src: '/lvjin-so101-view-side.jpeg' },
    { label: '背面ビュー', en: 'Rear View', src: '/lvjin-so101-view-rear.jpeg' },
    { label: '上面ビュー', en: 'Top View', src: '/lvjin-so101-view-top.jpeg' }
  ],
  kpis: [
    { label: '可搬質量', en: 'Payload', value: '10', unit: 'kg' },
    { label: 'リーチ', en: 'Reach', value: '1010', unit: 'mm' },
    { label: '繰返し位置決め精度', en: 'Repeatability', value: '±0.02', unit: 'mm' },
    { label: '保護等級', en: 'Protection', value: 'IP54', unit: '' },
    { label: '取付方向', en: 'Installation', value: '任意角度', unit: '' }
  ],
  features: [
    {
      title: '高精度ジョイントモジュール',
      titleEn: 'HIGH-PRECISION JOINT MODULE',
      description: '安定・高効率',
      detail:
        'ハーモニックドライブと高分解能エンコーダを統合。長期にわたって関節精度を維持し、高速・高サイクル用途にも安定して対応します。'
    },
    {
      title: '流線形アームボディ',
      titleEn: 'STREAMLINED ARM DESIGN',
      description: '剛性と意匠性の両立',
      detail:
        '一体型アルミ合金筐体を CNC 加工。高い構造剛性に加え、低風損で清掃性にも優れた仕上がりです。'
    },
    {
      title: 'コンパクト手首設計',
      titleEn: 'COMPACT WRIST DESIGN',
      description: 'コンパクトかつ高剛性',
      detail:
        '手首部を高度に統合し、大きな先端トルクにも対応。多様なフランジ・エンドエフェクタの装着が可能です。'
    },
    {
      title: '統合型ベース設計',
      titleEn: 'INTEGRATED BASE DESIGN',
      description: 'シンプル・安定・統合容易',
      detail:
        'ベースにコントローラ I/F、非常停止、ステータス LED を集約。シングルケーブル接続で生産ラインへの統合を容易にします。'
    }
  ],
  industries: [
    {
      title: 'スマート製造',
      icon: 'Factory',
      desc: 'ローディング／アンローディング、組立、パレタイズ、検査'
    },
    {
      title: '教育・研究',
      icon: 'GraduationCap',
      desc: '大学・研究機関、模倣学習、強化学習の研究用途'
    },
    {
      title: '物流・倉庫',
      icon: 'Truck',
      desc: 'ピッキング、仕分け、軽量搬送'
    },
    {
      title: '身体性 AI',
      icon: 'Brain',
      desc: 'ACT / Diffusion Policy / VLA など実機ポリシーのデプロイ'
    }
  ]
}

export type SiteConfigJa = typeof siteConfigJa
