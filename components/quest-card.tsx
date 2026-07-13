import { ScrollText, Gift, BookOpen } from 'lucide-react'
import { EntityCard } from '@/components/entity-card'
import { Badge } from '@/components/ui/badge'
import { questTypeLabels, questStatusLabels, questStatusVariant } from '@/lib/labels'
import type { Quest } from '@/mock'

// ============================================================
// QuestCard — 任务卡片组件
//
// 基于 EntityCard，展示任务图标、名称、所属游戏、
// 类型/状态 Badge、奖励数和描述。
// ============================================================

export type QuestCardData = {
  quest: Quest
  gameName?: string
  relatedGuideCount: number
}

export function QuestCard({ data }: { data: QuestCardData }) {
  const { quest, gameName, relatedGuideCount } = data

  return (
    <EntityCard
      href={`/quests/${quest.id}`}
      updatedAt={quest.updatedAt}
      statIcon={BookOpen}
      statValue={relatedGuideCount}
      statLabel="篇攻略"
    >
      {/* 图标区 */}
      <div className="flex justify-center pt-6">
        <div className="flex size-16 items-center justify-center rounded-xl bg-muted/40 ring-1 ring-border/50">
          <ScrollText className="size-7 text-muted-foreground/40" />
        </div>
      </div>

      {/* 信息区 */}
      <div className="flex flex-1 flex-col p-4 pt-3 text-center">
        {/* 名称 */}
        <h3 className="text-base font-semibold">{quest.name}</h3>

        {/* 所属游戏 */}
        {gameName && (
          <p className="mt-0.5 font-mono text-[11px] text-primary/60">{gameName}</p>
        )}

        {/* 类型 + 状态 */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
          <Badge variant="secondary" className="text-[10px]">
            {questTypeLabel(quest.type)}
          </Badge>
          <Badge variant={questStatusVariant(quest.status)} className="text-[10px]">
            {questStatusLabel(quest.status)}
          </Badge>
        </div>

        {/* 奖励数 */}
        {quest.rewards && quest.rewards.length > 0 && (
          <div className="mt-2 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
            <Gift className="size-3 shrink-0" />
            <span className="font-mono text-xs font-medium text-foreground/80">
              {quest.rewards.length}
            </span>
            <span>个奖励</span>
          </div>
        )}

        {/* 描述 */}
        <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
          {quest.description ?? '暂无描述'}
        </p>
      </div>
    </EntityCard>
  )
}

function questTypeLabel(t: string): string {
  return questTypeLabels[t] ?? t
}

function questStatusLabel(s: string): string {
  return questStatusLabels[s] ?? s
}
