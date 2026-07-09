import { Package } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'

export default function ItemsPage() {
  return (
    <>
      <PageHeader
        title="道具"
        description="整理游戏道具数据、合成配方和获取途径。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '道具' }]}
      />
      <EmptyState
        icon={Package}
        title="道具资料库即将上线"
        description="在这里创建和管理游戏道具的详细资料和获取攻略。"
      />
    </>
  )
}
