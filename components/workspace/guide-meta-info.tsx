'use client'

import { useWorkspace } from './workspace-provider'
import { getWordCount } from '@/mock/guides'

export function GuideMetaInfo() {
  const { activeGuide } = useWorkspace()

  if (!activeGuide) return null

  const wordCount = getWordCount(activeGuide)
  const sectionCount = activeGuide.sections.length

  const meta = [
    { label: '创建', value: new Date(activeGuide.createdAt).toLocaleDateString('zh-CN') },
    { label: '修改', value: new Date(activeGuide.updatedAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }) },
    { label: '字数', value: wordCount.toLocaleString() },
    { label: '章节', value: String(sectionCount) },
  ]

  return (
    <div className="space-y-1.5 px-3 py-3">
      {meta.map((m) => (
        <div key={m.label} className="flex items-center justify-between">
          <span className="text-[12px] text-muted-foreground/70">{m.label}</span>
          <span className="font-mono text-[12px] text-muted-foreground">{m.value}</span>
        </div>
      ))}
    </div>
  )
}
