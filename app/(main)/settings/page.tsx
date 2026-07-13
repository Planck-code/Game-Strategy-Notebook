'use client'

import { useState } from 'react'
import {
  Palette,
  Layout,
  Blocks,
  Info,
  Monitor,
  PanelRight,
  Save,
  ListOrdered,
  Filter,
  Clock,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { games } from '@/mock'
import {
  defaultAppearance,
  cornerRadiusOptions,
  defaultHomeOptions,
  defaultWorkspace,
  autoSaveIntervalOptions,
  defaultGuide,
  guideSortOrderOptions,
  aboutInfo,
  type CornerRadius,
  type DefaultHome,
  type AutoSaveInterval,
  type GuideSortOrder,
} from '@/mock/settings'

// ============================================================
// Settings 页面
//
// 应用设置中心，分四个板块：
// 界面设置 / 工作区设置 / 攻略设置 / 关于
// 所有状态仅页面内维护，不持久化。
// ============================================================

// ---- 内联组件：设置卡片 ----
function SettingSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-border/60 bg-card/40 p-5">
      {/* Section 标题 */}
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
          <Icon className="size-3.5 text-primary" />
        </div>
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>

      {/* 设置行列表 */}
      <div className="divide-y divide-border/50">
        {children}
      </div>
    </section>
  )
}

// ---- 内联组件：设置行 ----
function SettingRow({
  icon: Icon,
  label,
  description,
  children,
}: {
  icon?: React.ComponentType<{ className?: string }>
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-start gap-3">
        {Icon ? (
          <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-muted/60">
            <Icon className="size-3 text-muted-foreground" />
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="text-sm font-medium">{label}</p>
          {description ? (
            <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

// ---- 内联组件：设置下拉选择 ----
function SettingSelect({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 rounded-lg border border-border/60 bg-background/50 px-2.5 pr-7 font-mono text-[11px] text-foreground/80 outline-none transition-colors focus:border-primary/40 focus:ring-1 focus:ring-primary/30"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

// ============================================================
// 页面主体
// ============================================================
export default function SettingsPage() {
  // ---- 界面设置 ----
  const [darkMode, setDarkMode] = useState(defaultAppearance.darkMode)
  const [compactLayout, setCompactLayout] = useState(defaultAppearance.compactLayout)
  const [cornerRadius, setCornerRadius] = useState<CornerRadius>(defaultAppearance.cornerRadius)
  const [defaultHome, setDefaultHome] = useState<DefaultHome>(defaultAppearance.defaultHome)

  // ---- 工作区设置 ----
  const [expandLeftNav, setExpandLeftNav] = useState(defaultWorkspace.expandLeftNav)
  const [expandRightPanel, setExpandRightPanel] = useState(defaultWorkspace.expandRightPanel)
  const [autoSave, setAutoSave] = useState(defaultWorkspace.autoSave)
  const [autoSaveInterval, setAutoSaveInterval] = useState<AutoSaveInterval>(
    defaultWorkspace.autoSaveInterval,
  )

  // ---- 攻略设置 ----
  const [defaultSortOrder, setDefaultSortOrder] = useState<GuideSortOrder>(
    defaultGuide.defaultSortOrder,
  )
  const [defaultGameFilter, setDefaultGameFilter] = useState(defaultGuide.defaultGameFilter)
  const [showRecentlyEdited, setShowRecentlyEdited] = useState(defaultGuide.showRecentlyEdited)

  // 游戏筛选选项
  const gameFilterOptions = [
    { value: 'all', label: '全部游戏' },
    ...games.map((g) => ({ value: g.id, label: g.name })),
  ]

  return (
    <>
      <PageHeader
        title="设置"
        description="自定义你的工作区、偏好设置和账户信息。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '设置' }]}
      />

      <div className="mx-auto max-w-2xl space-y-5 pt-2">
        {/* ================================================================ */}
        {/* 第一部分：界面设置 */}
        {/* ================================================================ */}
        <SettingSection icon={Palette} title="界面设置">
          <SettingRow
            icon={Monitor}
            label="深色模式"
            description="切换深色 / 浅色主题外观。"
          >
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </SettingRow>

          <SettingRow
            icon={Layout}
            label="紧凑布局"
            description="减小卡片间距与内边距，在同一屏内展示更多内容。"
          >
            <Switch checked={compactLayout} onCheckedChange={setCompactLayout} />
          </SettingRow>

          <SettingRow
            icon={Blocks}
            label="卡片圆角"
            description="调整全局卡片的圆角大小。"
          >
            <SettingSelect
              value={cornerRadius}
              onChange={(v) => setCornerRadius(v as CornerRadius)}
              options={cornerRadiusOptions}
            />
          </SettingRow>

          <SettingRow
            icon={Monitor}
            label="默认首页"
            description="登录后首先进入的页面。"
          >
            <SettingSelect
              value={defaultHome}
              onChange={(v) => setDefaultHome(v as DefaultHome)}
              options={defaultHomeOptions}
            />
          </SettingRow>
        </SettingSection>

        {/* ================================================================ */}
        {/* 第二部分：工作区设置 */}
        {/* ================================================================ */}
        <SettingSection icon={Layout} title="工作区设置">
          <SettingRow
            icon={PanelRight}
            label="默认展开左侧导航"
            description="进入工作区时自动展开侧边导航栏。"
          >
            <Switch checked={expandLeftNav} onCheckedChange={setExpandLeftNav} />
          </SettingRow>

          <SettingRow
            icon={PanelRight}
            label="默认展开右侧上下文面板"
            description="编辑攻略时自动展开右侧属性面板。"
          >
            <Switch checked={expandRightPanel} onCheckedChange={setExpandRightPanel} />
          </SettingRow>

          <SettingRow
            icon={Save}
            label="自动保存"
            description="编辑内容时自动保存更改。"
          >
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </SettingRow>

          <SettingRow
            icon={Clock}
            label="自动保存间隔"
            description={autoSave ? '设置自动保存的触发间隔。' : '开启自动保存后可用。'}
          >
            <SettingSelect
              value={autoSaveInterval}
              onChange={(v) => setAutoSaveInterval(v as AutoSaveInterval)}
              options={autoSaveIntervalOptions}
            />
          </SettingRow>
        </SettingSection>

        {/* ================================================================ */}
        {/* 第三部分：攻略设置 */}
        {/* ================================================================ */}
        <SettingSection icon={ListOrdered} title="攻略设置">
          <SettingRow
            icon={ListOrdered}
            label="默认排序方式"
            description="攻略列表的默认排列顺序。"
          >
            <SettingSelect
              value={defaultSortOrder}
              onChange={(v) => setDefaultSortOrder(v as GuideSortOrder)}
              options={guideSortOrderOptions}
            />
          </SettingRow>

          <SettingRow
            icon={Filter}
            label="默认按游戏筛选"
            description="攻略列表的默认游戏筛选条件。"
          >
            <SettingSelect
              value={defaultGameFilter}
              onChange={setDefaultGameFilter}
              options={gameFilterOptions}
            />
          </SettingRow>

          <SettingRow
            icon={Clock}
            label="默认显示最近编辑"
            description="在攻略列表顶部显示最近编辑过的攻略。"
          >
            <Switch checked={showRecentlyEdited} onCheckedChange={setShowRecentlyEdited} />
          </SettingRow>
        </SettingSection>

        {/* ================================================================ */}
        {/* 第四部分：关于 */}
        {/* ================================================================ */}
        <SettingSection icon={Info} title="关于">
          <SettingRow label="项目名称">
            <span className="text-sm font-medium">{aboutInfo.name}</span>
          </SettingRow>

          <SettingRow label="当前版本">
            <span className="font-mono text-xs text-muted-foreground">
              {aboutInfo.version}
            </span>
          </SettingRow>

          <SettingRow label="技术栈">
            <div className="flex flex-wrap justify-end gap-1.5">
              {aboutInfo.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </SettingRow>
        </SettingSection>

        {/* 底部留白 */}
        <div className="h-8" />
      </div>
    </>
  )
}
