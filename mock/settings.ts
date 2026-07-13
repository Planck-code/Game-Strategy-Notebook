// ============================================================
// Settings Mock Data — 应用设置默认值与选项
//
// 所有设置仅维护 UI 状态，不持久化、不接入后端。
// ============================================================

// ============================================================
// 界面设置（Appearance）
// ============================================================

export type CornerRadius = 'default' | 'large'

export type DefaultHome = 'dashboard' | 'workspace'

export type AppearanceSettings = {
  darkMode: boolean
  compactLayout: boolean
  cornerRadius: CornerRadius
  defaultHome: DefaultHome
}

export const defaultAppearance: AppearanceSettings = {
  darkMode: true,
  compactLayout: false,
  cornerRadius: 'default',
  defaultHome: 'dashboard',
}

export const cornerRadiusOptions: { value: CornerRadius; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'large', label: 'Large' },
]

export const defaultHomeOptions: { value: DefaultHome; label: string }[] = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'workspace', label: 'Workspace' },
]

// ============================================================
// 工作区设置（Workspace）
// ============================================================

export type AutoSaveInterval = '10s' | '30s' | '1m'

export type WorkspaceSettings = {
  expandLeftNav: boolean
  expandRightPanel: boolean
  autoSave: boolean
  autoSaveInterval: AutoSaveInterval
}

export const defaultWorkspace: WorkspaceSettings = {
  expandLeftNav: true,
  expandRightPanel: false,
  autoSave: true,
  autoSaveInterval: '30s',
}

export const autoSaveIntervalOptions: { value: AutoSaveInterval; label: string }[] = [
  { value: '10s', label: '10 秒' },
  { value: '30s', label: '30 秒' },
  { value: '1m', label: '1 分钟' },
]

// ============================================================
// 攻略设置（Guide）
// ============================================================

export type GuideSortOrder = 'updated' | 'created' | 'title' | 'progress'

export type GuideSettings = {
  defaultSortOrder: GuideSortOrder
  defaultGameFilter: string // 'all' | gameId
  showRecentlyEdited: boolean
}

export const defaultGuide: GuideSettings = {
  defaultSortOrder: 'updated',
  defaultGameFilter: 'all',
  showRecentlyEdited: true,
}

export const guideSortOrderOptions: { value: GuideSortOrder; label: string }[] = [
  { value: 'updated', label: '最近更新' },
  { value: 'created', label: '创建时间' },
  { value: 'title', label: '标题' },
  { value: 'progress', label: '完成进度' },
]

// ============================================================
// 关于（About）
// ============================================================

export const aboutInfo = {
  name: 'Strategy Notebook',
  version: 'v0.1.0',
  techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'] as const,
}
