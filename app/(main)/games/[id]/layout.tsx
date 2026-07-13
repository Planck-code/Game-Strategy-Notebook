import { games } from '@/mock'

export function generateStaticParams() {
  return games.map((g) => ({ id: g.id }))
}

export default function GameDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
