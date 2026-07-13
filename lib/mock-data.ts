import type { LucideIcon } from 'lucide-react'
import {
  Home,
  Library,
  FileEdit,
  Users,
  Skull,
  Map,
  ScrollText,
  Package,
  Clock,
  Settings,
} from 'lucide-react'

export type NavItem = {
  key: string
  label: string
  icon: LucideIcon
  href: string
  badge?: number
}

export const navItems: NavItem[] = [
  { key: 'home', label: '首页', icon: Home, href: '/' },
  { key: 'library', label: '游戏库', icon: Library, href: '/games', badge: 12 },
  { key: 'editor', label: '攻略编辑', icon: FileEdit, href: '/guides' },
  { key: 'characters', label: '人物资料', icon: Users, href: '/characters' },
  { key: 'bosses', label: 'Boss 图鉴', icon: Skull, href: '/bosses' },
  { key: 'map', label: '地图', icon: Map, href: '/maps' },
  { key: 'quests', label: '任务', icon: ScrollText, href: '/quests', badge: 5 },
  { key: 'items', label: '道具', icon: Package, href: '/items' },
  { key: 'timeline', label: '时间线', icon: Clock, href: '/timeline' },
  { key: 'settings', label: '设置', icon: Settings, href: '/settings' },
]

export type Strategy = {
  id: string
  title: string
  game: string
  cover: string
  tag: string
  progress: number
  updatedAt: string
  wordCount: number
  accent: string
}

export const recentStrategies: Strategy[] = [
  {
    id: 's1',
    title: '深渊教团 · 全 Boss 速通路线',
    game: 'Elden Ring',
    cover: '/strategy-elden-ring-boss.png',
    tag: 'Boss 攻略',
    progress: 82,
    updatedAt: '12 分钟前',
    wordCount: 4820,
    accent: 'oklch(0.62 0.18 255)',
  },
  {
    id: 's2',
    title: '新手开荒 · 前 20 小时资源规划',
    game: 'Baldur’s Gate 3',
    cover: '/strategy-baldurs-gate-planning.png',
    tag: '新手指南',
    progress: 46,
    updatedAt: '1 小时前',
    wordCount: 2310,
    accent: 'oklch(0.72 0.13 165)',
  },
  {
    id: 's3',
    title: '隐藏结局解锁全流程',
    game: 'Cyberpunk 2077',
    cover: '/strategy-cyberpunk-ending.png',
    tag: '剧情线',
    progress: 68,
    updatedAt: '3 小时前',
    wordCount: 3670,
    accent: 'oklch(0.75 0.14 85)',
  },
  {
    id: 's4',
    title: '高难本 Build 与配装思路',
    game: 'Diablo IV',
    cover: '/strategy-diablo-build.png',
    tag: '配装',
    progress: 30,
    updatedAt: '昨天',
    wordCount: 1560,
    accent: 'oklch(0.68 0.17 300)',
  },
]

export type Favorite = {
  id: string
  title: string
  game: string
  icon: string
  category: string
  stars: number
}

export const favoriteStrategies: Favorite[] = [
  {
    id: 'f1',
    title: '锻造材料速查表',
    game: 'Monster Hunter',
    icon: '/fav-monster-hunter.png',
    category: '资料库',
    stars: 128,
  },
  {
    id: 'f2',
    title: '全支线任务地图标记',
    game: 'The Witcher 3',
    icon: '/fav-witcher-map.png',
    category: '地图',
    stars: 96,
  },
  {
    id: 'f3',
    title: '角色养成优先级',
    game: 'Genshin Impact',
    icon: '/fav-genshin-character.png',
    category: '养成',
    stars: 214,
  },
  {
    id: 'f4',
    title: '联机副本站位图',
    game: 'Destiny 2',
    icon: '/fav-destiny-raid.png',
    category: '团本',
    stars: 73,
  },
]

export type TodoItem = {
  id: string
  title: string
  meta: string
  done: boolean
  priority: 'high' | 'medium' | 'low'
}

export const todayTasks: TodoItem[] = [
  { id: 't1', title: '补全 Boss 弱点表格', meta: 'Elden Ring 攻略', done: false, priority: 'high' },
  { id: 't2', title: '校对第三章剧情流程', meta: 'Cyberpunk 2077', done: false, priority: 'medium' },
  { id: 't3', title: '上传新副本站位截图', meta: 'Destiny 2', done: true, priority: 'low' },
  { id: 't4', title: '更新版本改动说明', meta: 'Genshin Impact', done: false, priority: 'medium' },
  { id: 't5', title: '回复读者评论 8 条', meta: '社区', done: true, priority: 'low' },
]

export const workspaceStats = {
  totalStrategies: 48,
  publishedThisWeek: 6,
  totalViews: '128.4k',
  followers: '9,320',
}
