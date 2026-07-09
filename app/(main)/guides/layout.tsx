'use client'

import { WorkspaceProvider } from '@/components/workspace/workspace-provider'

/**
 * /guides 路由专属布局
 *
 * 为整个 Workspace 提供 WorkspaceProvider 状态上下文。
 * DashboardLayout 的 variant='workspace' 由父级 (main)/layout.tsx 通过 pathname 自动设置。
 */
export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceProvider>{children}</WorkspaceProvider>
}
