'use client'

import { RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 ring-1 ring-destructive/20">
          <RefreshCw className="size-7 text-destructive/70" />
        </div>
        <h2 className="text-lg font-semibold">页面加载出错</h2>
        <p className="max-w-sm text-pretty text-sm text-muted-foreground">
          抱歉，页面渲染时发生了错误。您可以尝试刷新页面，或返回首页。
        </p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={reset}>
            <RefreshCw className="size-3.5" />
            重试
          </Button>
          <Link href="/">
            <Button variant="default" size="sm">
              <Home className="size-3.5" />
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
