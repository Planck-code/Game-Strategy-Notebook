'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function GuideSearch() {
  const [value, setValue] = useState('')

  return (
    <div className="relative px-3 py-2">
      <Search className="pointer-events-none absolute left-5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="搜索攻略…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-8 rounded-lg border-border/50 bg-background/60 pl-8 text-xs placeholder:text-muted-foreground/60"
      />
    </div>
  )
}
