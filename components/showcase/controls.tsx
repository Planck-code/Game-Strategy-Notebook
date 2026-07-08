'use client'

import { useState } from 'react'
import {
  Plus,
  Download,
  Trash2,
  Star,
  Settings,
  ChevronDown,
  Bell,
  Sparkles,
  MapPin,
  Swords,
} from 'lucide-react'
import { toast } from 'sonner'
import { ShowcaseSection, Row } from './section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SearchInput } from '@/components/ui/search-input'
import { Badge } from '@/components/ui/badge'
import { Tag } from '@/components/ui/tag'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export function ControlsShowcase() {
  const [progress, setProgress] = useState(64)
  const [checked, setChecked] = useState(true)
  const [tags, setTags] = useState(['开放世界', 'Boss战', '速通', '剧情向'])
  const [page, setPage] = useState(2)

  return (
    <div className="flex flex-col gap-10">
      {/* Buttons */}
      <ShowcaseSection id="button" title="Button 按钮" description="variant · size">
        <div className="flex flex-col gap-5">
          <Row label="Variants">
            <Button>
              <Plus className="size-4" /> 新建攻略
            </Button>
            <Button variant="secondary">次级</Button>
            <Button variant="outline">描边</Button>
            <Button variant="ghost">幽灵</Button>
            <Button variant="destructive">
              <Trash2 className="size-4" /> 删除
            </Button>
            <Button variant="link">链接</Button>
          </Row>
          <Row label="Sizes">
            <Button size="sm">小号</Button>
            <Button>默认</Button>
            <Button size="lg">大号</Button>
            <Button size="icon" aria-label="设置">
              <Settings className="size-4" />
            </Button>
          </Row>
          <Row label="States">
            <Button disabled>禁用</Button>
            <Button variant="outline">
              <Download className="size-4" /> 导出
            </Button>
            <Button className="bg-primary/90 hover:bg-primary">
              <Sparkles className="size-4" /> AI 生成
            </Button>
          </Row>
        </div>
      </ShowcaseSection>

      {/* Input & Search */}
      <ShowcaseSection id="input" title="Input & Search 输入" description="表单 · 搜索">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="demo-title">攻略标题</Label>
            <Input id="demo-title" placeholder="输入攻略标题…" defaultValue="艾尔登法环 · 满级Build" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="demo-disabled">禁用状态</Label>
            <Input id="demo-disabled" placeholder="不可编辑" disabled />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label>全局搜索框</Label>
            <SearchInput />
          </div>
        </div>
      </ShowcaseSection>

      {/* Badge & Tag */}
      <ShowcaseSection id="badge" title="Badge & Tag 标签" description="状态 · 分类">
        <div className="flex flex-col gap-5">
          <Row label="Badge">
            <Badge>默认</Badge>
            <Badge variant="secondary">进行中</Badge>
            <Badge variant="outline">草稿</Badge>
            <Badge variant="destructive">已过期</Badge>
            <Badge className="bg-emerald-500/15 text-emerald-400">已发布</Badge>
          </Row>
          <Row label="Tag · 可移除">
            {tags.map((t, i) => (
              <Tag
                key={t}
                color={(['blue', 'teal', 'amber', 'purple'] as const)[i % 4]}
                onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}
              >
                {t}
              </Tag>
            ))}
            {tags.length === 0 ? (
              <span className="font-mono text-xs text-muted-foreground">标签已清空</span>
            ) : null}
          </Row>
        </div>
      </ShowcaseSection>

      {/* Avatar & Card */}
      <ShowcaseSection id="avatar" title="Avatar & Card 头像与卡片" description="用户 · 容器">
        <div className="flex flex-col gap-6">
          <Row label="Avatar">
            <Avatar>
              <AvatarImage src="/user-avatar-gamer.png" alt="用户" />
              <AvatarFallback>GM</AvatarFallback>
            </Avatar>
            <Avatar className="ring-2 ring-primary/40">
              <AvatarImage src="/user-avatar-gamer.png" alt="用户" />
              <AvatarFallback>GM</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback className="bg-primary/20 text-primary">S1</AvatarFallback>
            </Avatar>
            <div className="flex -space-x-2">
              {['A', 'B', 'C'].map((x) => (
                <Avatar key={x} className="ring-2 ring-card">
                  <AvatarFallback className="text-xs">{x}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </Row>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-border/60 bg-background/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Swords className="size-4 text-primary" /> Boss 战攻略
                </CardTitle>
                <CardDescription>玛莲妮亚 · 三阶段打法解析</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-2">
                <Tag color="blue">Boss战</Tag>
                <Tag color="amber">高难</Tag>
              </CardContent>
            </Card>
            <Card className="border-border/60 bg-background/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="size-4 text-primary" /> 地图收集
                </CardTitle>
                <CardDescription>宁姆格福 · 全物品点位</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={82} className="h-1.5" />
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">收集进度 82%</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </ShowcaseSection>

      {/* Overlays: Dropdown / Dialog / Drawer / Tooltip / Toast */}
      <ShowcaseSection id="overlay" title="Overlay 浮层" description="Dropdown · Dialog · Drawer · Tooltip · Toast">
        <Row>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                操作菜单 <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="glass">
              <DropdownMenuLabel>攻略操作</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Star className="size-4" /> 收藏
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="size-4" /> 导出 Markdown
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="size-4" /> 删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">打开对话框</Button>
            </DialogTrigger>
            <DialogContent className="glass">
              <DialogHeader>
                <DialogTitle>新建攻略</DialogTitle>
                <DialogDescription>为你的新攻略起一个标题，稍后可随时修改。</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2 py-2">
                <Label htmlFor="dlg-name">攻略标题</Label>
                <Input id="dlg-name" placeholder="例如：新手开荒指南" />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">取消</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>创建</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">打开抽屉</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-md">
                <DrawerHeader>
                  <DrawerTitle>属性面板</DrawerTitle>
                  <DrawerDescription>移动端以抽屉形式展示右侧属性。</DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-3 px-4 pb-2">
                  <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3">
                    <span className="text-sm">难度</span>
                    <Tag color="amber">困难</Tag>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3">
                    <span className="text-sm">状态</span>
                    <Badge className="bg-emerald-500/15 text-emerald-400">已发布</Badge>
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button>完成</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="通知">
                <Bell className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>你有 3 条新提醒</TooltipContent>
          </Tooltip>

          <Button
            onClick={() =>
              toast.success('攻略已保存', {
                description: '「艾尔登法环 · 满级Build」已同步至工作区',
              })
            }
          >
            触发 Toast
          </Button>
        </Row>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection id="tabs" title="Tabs 选项卡" description="内容分组">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="walkthrough">流程</TabsTrigger>
            <TabsTrigger value="items">道具</TabsTrigger>
          </TabsList>
          <TabsContent
            value="overview"
            className="mt-4 rounded-lg border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground"
          >
            本攻略涵盖全流程、支线与隐藏结局的完整解析。
          </TabsContent>
          <TabsContent
            value="walkthrough"
            className="mt-4 rounded-lg border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground"
          >
            第 1 章：出生地 → 教程 Boss → 第一处赐福点。
          </TabsContent>
          <TabsContent
            value="items"
            className="mt-4 rounded-lg border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground"
          >
            关键道具：黄金种子 ×12、圣杯露滴 ×4。
          </TabsContent>
        </Tabs>
      </ShowcaseSection>

      {/* Progress & Checkbox */}
      <ShowcaseSection id="progress" title="Progress & Checkbox 进度与勾选" description="状态反馈">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">攻略完成度</span>
              <span className="font-mono text-xs text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <Row>
              <Button size="sm" variant="outline" onClick={() => setProgress((p) => Math.max(0, p - 10))}>
                -10%
              </Button>
              <Button size="sm" variant="outline" onClick={() => setProgress((p) => Math.min(100, p + 10))}>
                +10%
              </Button>
            </Row>
          </div>
          <div className="flex flex-col gap-3 border-t border-border/60 pt-5">
            <label className="flex items-center gap-3 text-sm">
              <Checkbox
                checked={checked}
                onCheckedChange={(v) => setChecked(Boolean(v))}
                className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />
              标记为已完成
            </label>
            <label className="flex items-center gap-3 text-sm text-muted-foreground">
              <Checkbox disabled /> 禁用状态
            </label>
          </div>
        </div>
      </ShowcaseSection>

      {/* Breadcrumb & Pagination */}
      <ShowcaseSection id="nav" title="Breadcrumb & Pagination 导航" description="路径 · 翻页">
        <div className="flex flex-col gap-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">游戏库</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">艾尔登法环</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>满级Build攻略</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setPage((p) => Math.max(1, p - 1))
                  }}
                />
              </PaginationItem>
              {[1, 2, 3, 4].map((n) => (
                <PaginationItem key={n}>
                  <PaginationLink
                    href="#"
                    isActive={page === n}
                    onClick={(e) => {
                      e.preventDefault()
                      setPage(n)
                    }}
                  >
                    {n}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setPage((p) => Math.min(4, p + 1))
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </ShowcaseSection>
    </div>
  )
}
