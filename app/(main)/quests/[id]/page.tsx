import { ScrollText } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { quests } from '@/mock'

export function generateStaticParams() {
  return quests.map((q) => ({ id: q.id }))
}

export default function QuestDetailPage() {
  return (
    <>
      <PageHeader
        title="任务详情"
        description="查看任务步骤、奖励列表、前置条件和关联攻略。"
        breadcrumbs={[
          { label: '首页', href: '/' },
          { label: '任务', href: '/quests' },
          { label: '任务详情' },
        ]}
      />
      <EmptyState
        icon={ScrollText}
        title="任务详情页即将上线"
        description="在这里查看任务的详细步骤、目标、奖励和分支选择。"
      />
    </>
  )
}
