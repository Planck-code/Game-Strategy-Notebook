import { User, Swords, Map, ScrollText, Package } from 'lucide-react'
import type { ReferenceType } from '@/mock'

const iconMap: Record<ReferenceType, React.ComponentType<{ className?: string }>> = {
  character: User,
  boss: Swords,
  map: Map,
  quest: ScrollText,
  item: Package,
}

const colorMap: Record<ReferenceType, string> = {
  character: 'text-sky-400',
  boss: 'text-red-400',
  map: 'text-emerald-400',
  quest: 'text-amber-400',
  item: 'text-violet-400',
}

export function ReferenceIcon({ type, className }: { type: ReferenceType; className?: string }) {
  const Icon = iconMap[type]
  return <Icon className={className ?? ''} />
}

export function getReferenceColor(type: ReferenceType): string {
  return colorMap[type]
}
