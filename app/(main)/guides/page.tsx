import { FileEdit } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        title="攻略编辑"
        description="创建和编辑游戏攻略，支持富文本、结构化数据和多媒体内容。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '攻略编辑' }]}
      />
      <EmptyState
        icon={FileEdit}
        title="攻略编辑器即将上线"
        description="在这里编写、排版和发布你的游戏攻略内容。"
      />
    </>
  )
}
