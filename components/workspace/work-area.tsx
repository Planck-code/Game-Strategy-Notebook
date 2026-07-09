'use client'

import { WorkToolbar } from './work-toolbar'
import { SectionEditor } from './section-editor'
import { WorkStatusbar } from './work-statusbar'

/**
 * WorkArea — Zone 3：主工作区
 *
 * 包含：
 * - 顶部工具栏
 * - 章节编辑器（中间核心区域）
 * - 底部状态栏
 */
export function WorkArea() {
  return (
    <div className="flex h-full flex-col bg-background">
      <WorkToolbar />
      <SectionEditor />
      <WorkStatusbar />
    </div>
  )
}
