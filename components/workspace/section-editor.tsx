'use client'

import { FileText } from 'lucide-react'
import { useWorkspace } from './workspace-provider'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'

export function SectionEditor() {
  const { activeGuide, activeSection, updateSectionContent } = useWorkspace()

  // 空状态：未选择攻略
  if (!activeGuide) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
            <FileText className="size-7 text-primary/50" />
          </div>
          <div>
            <p className="text-lg font-semibold">攻略工作台</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              从左侧导航器选择一篇攻略开始编辑，或创建新攻略。
            </p>
          </div>
        </div>
      </div>
    )
  }

  // 空状态：攻略无章节
  if (!activeSection) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
            <FileText className="size-7 text-primary/50" />
          </div>
          <div>
            <p className="text-lg font-semibold">{activeGuide.title}</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              此攻略还没有章节，点击工具栏 + 按钮添加第一章。
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="flex-1">
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        {/* 章节标题 */}
        <div>
          <Input
            value={activeSection.title}
            readOnly
            className="h-auto border-0 bg-transparent px-0 text-2xl font-bold text-foreground shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0"
          />
        </div>

        {/* 章节内容 */}
        <div>
          <Textarea
            value={activeSection.content}
            onChange={(e) => updateSectionContent(activeSection.id, e.target.value)}
            placeholder="开始编写攻略内容…"
            className="min-h-[400px] resize-none border-0 bg-transparent px-0 text-[15px] leading-relaxed text-foreground/85 shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0"
          />
        </div>
      </div>
    </ScrollArea>
  )
}
