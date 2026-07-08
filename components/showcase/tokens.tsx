import { ShowcaseSection } from './section'

const colorTokens = [
  { name: 'background', varName: '--background', desc: '页面底色' },
  { name: 'card', varName: '--card', desc: '卡片' },
  { name: 'primary', varName: '--primary', desc: '主色 · 蓝' },
  { name: 'secondary', varName: '--secondary', desc: '次级' },
  { name: 'muted', varName: '--muted', desc: '弱化' },
  { name: 'accent', varName: '--accent', desc: '强调' },
  { name: 'destructive', varName: '--destructive', desc: '危险' },
  { name: 'border', varName: '--border', desc: '描边' },
]

const chartTokens = ['--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5']

const radiusTokens = [
  { name: 'sm', cls: 'rounded-sm' },
  { name: 'md', cls: 'rounded-md' },
  { name: 'lg', cls: 'rounded-lg' },
  { name: 'xl', cls: 'rounded-xl' },
  { name: '2xl', cls: 'rounded-2xl' },
  { name: 'full', cls: 'rounded-full' },
]

const shadowTokens = [
  { name: 'sm', cls: 'shadow-sm' },
  { name: 'md', cls: 'shadow-md' },
  { name: 'lg', cls: 'shadow-lg' },
  { name: 'glow', cls: 'shadow-lg shadow-primary/40' },
]

export function TokensShowcase() {
  return (
    <ShowcaseSection
      id="tokens"
      title="设计令牌"
      description="Design Tokens · 全局继承"
      className="flex flex-col gap-8"
    >
      {/* 颜色 */}
      <div>
        <p className="mb-3 text-sm font-medium">语义色板</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {colorTokens.map((c) => (
            <div
              key={c.name}
              className="overflow-hidden rounded-xl border border-border/60 bg-background/40"
            >
              <div
                className="h-14 w-full border-b border-border/60"
                style={{ background: `var(${c.varName})` }}
              />
              <div className="px-3 py-2">
                <p className="font-mono text-xs font-medium">{c.name}</p>
                <p className="font-mono text-[10px] text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 图表色 */}
      <div>
        <p className="mb-3 text-sm font-medium">数据可视化色</p>
        <div className="flex flex-wrap gap-3">
          {chartTokens.map((c) => (
            <div key={c} className="flex flex-col items-center gap-1.5">
              <div
                className="size-12 rounded-full ring-1 ring-border/60"
                style={{ background: `var(${c})` }}
              />
              <span className="font-mono text-[10px] text-muted-foreground">{c.replace('--', '')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 字体 */}
      <div>
        <p className="mb-3 text-sm font-medium">字体系统</p>
        <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-background/40 p-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Sans · Geist
            </p>
            <p className="font-sans text-2xl font-semibold">攻略创作，从这里开始 Aa</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Mono · Geist Mono
            </p>
            <p className="font-mono text-lg">const strategy = &quot;S-Tier&quot;;</p>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-border/60 pt-3">
            <span className="text-3xl font-bold">H1</span>
            <span className="text-xl font-semibold">H2</span>
            <span className="text-base font-medium">Body</span>
            <span className="text-sm text-muted-foreground">Small</span>
            <span className="font-mono text-xs text-muted-foreground">Caption</span>
          </div>
        </div>
      </div>

      {/* 圆角与阴影 */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-medium">圆角 Radius</p>
          <div className="flex flex-wrap gap-3">
            {radiusTokens.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-1.5">
                <div className={`size-12 border border-primary/40 bg-primary/15 ${r.cls}`} />
                <span className="font-mono text-[10px] text-muted-foreground">{r.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium">阴影 Shadow</p>
          <div className="flex flex-wrap gap-4">
            {shadowTokens.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-1.5">
                <div className={`size-12 rounded-xl bg-card ${s.cls}`} />
                <span className="font-mono text-[10px] text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ShowcaseSection>
  )
}
