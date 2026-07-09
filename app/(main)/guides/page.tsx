'use client'

import { WorkspaceLayout } from '@/components/workspace/workspace-layout'
import { GuideNavigator } from '@/components/workspace/guide-navigator'
import { WorkArea } from '@/components/workspace/work-area'
import { ContextPanel } from '@/components/workspace/context-panel'

/**
 * 攻略工作台（Guide Workspace）— 产品核心页面
 *
 * 四栏布局：
 * - AppSidebar（外层 DashboardLayout 提供）
 * - GuideNavigator（攻略列表 + 大纲树）
 * - WorkArea（工具栏 + 章节编辑器 + 状态栏）
 * - ContextPanel（属性 + 关联 + 素材 + 元信息）
 */
export default function GuidesPage() {
  return (
    <WorkspaceLayout
      navigator={<GuideNavigator />}
      workArea={<WorkArea />}
      contextPanel={<ContextPanel />}
    />
  )
}
