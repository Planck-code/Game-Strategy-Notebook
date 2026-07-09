import { ScrollText } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'

export default function QuestsPage() {
  return (
    <>
      <PageHeader
        title="任务"
        description="追踪游戏任务进度、记录任务链和分支剧情。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '任务' }]}
      />
      <EmptyState
        icon={ScrollText}
        title="任务管理即将上线"
        description="在这里追踪和管理游戏任务进度、记录关键选择。"
      />
    </>
  )
}
