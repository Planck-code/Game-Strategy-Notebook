'use client'

import { WorkspaceLayout } from '@/components/workspace/workspace-layout'
import { GuideNavigator } from '@/components/workspace/guide-navigator'
import { WorkArea } from '@/components/workspace/work-area'
import { ContextPanel } from '@/components/workspace/context-panel'
import { CreateGuideDialog } from '@/components/workspace/create-guide-dialog'

/**
 * 攻略工作台（Guide Workspace）— 产品核心页面
 */
export default function GuidesPage() {
  return (
    <>
      <WorkspaceLayout
        navigator={<GuideNavigator />}
        workArea={<WorkArea />}
        contextPanel={<ContextPanel />}
      />
      <CreateGuideDialog />
    </>
  )
}
