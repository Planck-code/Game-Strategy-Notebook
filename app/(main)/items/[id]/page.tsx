import { Package } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { items } from '@/mock'

export function generateStaticParams() {
  return items.map((i) => ({ id: i.id }))
}

export default function ItemDetailPage() {
  return (
    <>
      <PageHeader
        title="道具详情"
        description="查看道具属性、获取方式、合成配方和关联攻略。"
        breadcrumbs={[
          { label: '首页', href: '/' },
          { label: '道具', href: '/items' },
          { label: '道具详情' },
        ]}
      />
      <EmptyState
        icon={Package}
        title="道具详情页即将上线"
        description="在这里查看道具的详细属性、获取途径和关联攻略。"
      />
    </>
  )
}
