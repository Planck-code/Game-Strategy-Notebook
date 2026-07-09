import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export type BreadcrumbItem = {
  label: string
  href?: string
}

export type PageHeaderProps = {
  /** 页面标题 */
  title: string
  /** 标题下方的描述（可选） */
  description?: string
  /** 面包屑路径（可选），最后一项为当前页 */
  breadcrumbs?: BreadcrumbItem[]
}

/**
 * PageHeader — 页面标题 + 可选面包屑 + 可选描述
 *
 * 设计语言与 WelcomeHero 保持一致：深色、简洁、游戏感
 *
 * @example
 * <PageHeader
 *   title="游戏库"
 *   description="管理你的所有游戏攻略资源"
 *   breadcrumbs={[{ label: '首页', href: '/' }, { label: '游戏库' }]}
 * />
 */
export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="space-y-1 pb-2">
      {/* 面包屑 */}
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav aria-label="breadcrumb" className="mb-2">
          <ol className="flex flex-wrap items-center gap-1 text-[13px] text-muted-foreground">
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1
              return (
                <li key={crumb.label} className="inline-flex items-center gap-1">
                  {isLast || !crumb.href ? (
                    <span className="text-foreground/80 font-medium">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {crumb.label}
                    </Link>
                  )}
                  {!isLast ? (
                    <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
                  ) : null}
                </li>
              )
            })}
          </ol>
        </nav>
      ) : null}

      {/* 标题 */}
      <h1 className="text-2xl font-bold leading-tight">{title}</h1>

      {/* 描述 */}
      {description ? (
        <p className="max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
