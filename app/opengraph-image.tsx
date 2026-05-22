import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SO101 Imitation Learning Guide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(135deg, #1a1626 0%, #1f1730 50%, #281b3a 100%)',
          color: '#fff',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(124, 92, 255, 0.45) 0%, transparent 70%)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            right: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(180, 92, 255, 0.4) 0%, transparent 70%)'
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #7c5cff, #b45cff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 700
            }}
          >
            绿
          </div>
          <span style={{ opacity: 0.9 }}>绿晋科技 · 具身智能学习平台</span>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              background: 'linear-gradient(135deg, #fff 0%, #c7c4ff 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex'
            }}
          >
            SO101 Imitation
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: 'flex'
            }}
          >
            Learning Guide
          </div>
          <div style={{ marginTop: 32, fontSize: 32, opacity: 0.75, maxWidth: 900 }}>
            从环境配置到 ACT 模型部署，机械臂模仿学习的完整实战路径
          </div>

          <div
            style={{
              marginTop: 48,
              display: 'flex',
              gap: 16,
              fontSize: 22
            }}
          >
            {['9 个章节', 'LeRobot', 'ACT 算法', '中文实战'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '10px 20px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex'
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
