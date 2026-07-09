'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { GuideProperties } from './guide-properties'
import { ReferenceManager } from './reference-manager'
import { AttachmentGrid } from './attachment-grid'
import { GuideMetaInfo } from './guide-meta-info'

/**
 * ContextPanel — Zone 4：上下文面板
 *
 * 展示和编辑当前攻略的元数据：
 * - 攻略属性（游戏、状态、进度、标签）
 * - 关联内容（人物/Boss/地图/任务/道具）
 * - 素材管理（图片 + 附件）
 * - 攻略元信息（创建/修改时间、字数、章节数）
 */
export function ContextPanel() {
  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1">
        {/* 攻略属性 */}
        <GuideProperties />

        <Separator className="mx-3" />

        {/* 关联内容 */}
        <div>
          <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            关联内容
          </p>
          <ReferenceManager />
        </div>

        <Separator className="mx-3" />

        {/* 素材管理 */}
        <div>
          <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            素材与附件
          </p>
          <AttachmentGrid />
        </div>

        <Separator className="mx-3" />

        {/* 攻略信息 */}
        <div>
          <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            攻略信息
          </p>
          <GuideMetaInfo />
        </div>
      </ScrollArea>
    </div>
  )
}
