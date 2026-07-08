# Design System

Game Strategy Notebook 设计规范文档。基于首页实际代码逆向抽取，所有页面必须严格遵守。

---

## 1. 色彩系统

采用 OKLCH 色彩空间 + CSS 变量体系，定义于 [app/globals.css](app/globals.css)。

### 语义色板

| Token | CSS 变量 | OKLCH 值 | 等效 Hex | 用途 |
|-------|----------|----------|----------|------|
| Background | `--background` | `oklch(0.17 0.008 260)` | `#0E1116` | 页面主背景 |
| Sidebar | `--sidebar` | `oklch(0.15 0.008 260)` | `#15181D` | 侧边栏背景 |
| Card | `--card` | `oklch(0.21 0.01 260)` | `#1B1F25` | 卡片容器 |
| Primary | `--primary` | `oklch(0.62 0.18 255)` | `#4F8CFF` | 主操作、激活态 |
| Destructive | `--destructive` | `oklch(0.62 0.2 22)` | `#EF4444` | 危险操作 |
| Success | — | — | `#22C55E` / `emerald-400` | 成功状态（Tailwind 色） |
| Border | `--border` | `oklch(1 0 0 / 9%)` | `rgba(255,255,255,0.09)` | 边框/分割线 |
| Muted | `--muted` | `oklch(0.25 0.01 260)` | — | 弱化背景 |
| Muted FG | `--muted-foreground` | `oklch(0.68 0.015 260)` | — | 弱化文字 |
| Accent | `--accent` | `oklch(0.3 0.03 255)` | — | 强调背景 |
| Ring | `--ring` | `oklch(0.62 0.18 255)` | — | Focus 环 |

**使用原则：** 始终通过 CSS 变量引用颜色，禁止硬编码 Hex。

```css
/* ✅ 正确 */
background: var(--card);
color: var(--primary);

/* ❌ 错误 */
background: #1B1F25;
color: #4F8CFF;
```

---

## 2. 圆角

| 级别 | CSS 类 | 实际值 | 适用范围 |
|------|--------|--------|---------|
| sm | `rounded-sm` | `calc(0.75rem * 0.6)` ≈ 7px | 小标签内部 |
| md | `rounded-md` | `calc(0.75rem * 0.8)` ≈ 10px | Tag、kbd |
| lg | `rounded-lg` | `0.75rem` = 12px | Button、Input、Avatar |
| xl | `rounded-xl` | `0.75rem` = 12px | **Card（主力圆角）** |
| 2xl | `rounded-2xl` | `calc(0.75rem * 1.4)` ≈ 17px | Hero区域 |
| full | `rounded-full` | — | Avatar、Progress、Badge |

**核心规则：Card 统一 `rounded-xl`，Button/Input 统一 `rounded-lg`。**

---

## 3. 间距

| Token | 值 | Tailwind | 适用范围 |
|-------|-----|----------|---------|
| 页面左右 Padding | 16px / 24px | `px-4 md:px-6` | 主内容区 |
| 页面上下 Padding | 24px | `py-6` | 主内容区 |
| 区块间距 | 24px | `gap-6` | Section 之间 |
| Card 内边距 | 16px | `p-4` | Card 内部 |
| 小间距 | 12px | `gap-3` | 列表项之间 |

---

## 4. 阴影

| 场景 | Tailwind 类 | 说明 |
|------|------------|------|
| Card 默认 | `shadow-lg shadow-black/20` | 配合 glass 效果 |
| Card Hover | `hover:shadow-lg hover:shadow-primary/5` | 微弱的品牌色光晕 |
| 毛玻璃 | `backdrop-blur-xl` / `backdrop-blur-md` | 配合半透明背景 |

---

## 5. 动效

| 属性 | 值 | 类 |
|------|-----|-----|
| 过渡时间 | `200ms` | `duration-200` |
| 过渡属性 | `all` / `colors` / `transform` | `transition-all` / `transition-colors` / `transition-transform` |
| Hover 位移 | `-translate-y-0.5` | 卡片悬浮微上移 |
| Hover 缩放 | `scale-105` / `scale-110` | 图片 hover 放大 |

**统一写法：** `transition-all duration-200` 或 `transition-colors duration-200`

---

## 6. 字体

| 用途 | Font Family | Tailwind |
|------|------------|----------|
| 正文 | Geist Sans | `font-sans` |
| 代码/数据 | Geist Mono | `font-mono` |
| 标题 | Geist Sans Bold | `font-sans font-bold` |

**层级：**
- H1: `text-2xl md:text-3xl font-bold`
- H2: `text-lg font-semibold tracking-tight`
- H3 (Section): `text-sm font-semibold`
- Body: `text-sm leading-relaxed`
- Caption: `font-mono text-[11px] text-muted-foreground`
- Micro: `font-mono text-[10px]`

---

## 7. 图标

- 图标库：`lucide-react`
- 默认尺寸：`size-4`（16px）
- 导航图标：`size-[18px]`
- 大图标：`size-5`（20px）
- 颜色：继承文字色，激活态 `text-primary`
- 装饰性容器：`flex size-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30`

---

## 8. 组件规范

### 8.1 Button（shadcn/ui Button）

文件：[components/ui/button.tsx](components/ui/button.tsx)

```tsx
import { Button } from '@/components/ui/button'

// 变体
<Button variant="default">主操作</Button>
<Button variant="secondary">次要</Button>
<Button variant="outline">描边</Button>
<Button variant="ghost">幽灵</Button>
<Button variant="destructive">危险</Button>
<Button variant="link">链接</Button>

// 尺寸
<Button size="sm">小号 (h-7)</Button>
<Button size="default">默认 (h-8)</Button>
<Button size="lg">大号 (h-9)</Button>
<Button size="icon">图标 (size-8)</Button>
```

**禁止重新设计 Button。**

### 8.2 Input（shadcn/ui Input）

文件：[components/ui/input.tsx](components/ui/input.tsx)

```tsx
import { Input } from '@/components/ui/input'
import { SearchInput } from '@/components/ui/search-input'

<Input placeholder="输入内容..." />
<SearchInput placeholder="搜索攻略..." />
```

**禁止重新设计 Input。**

### 8.3 Card（shadcn/ui Card）

文件：[components/ui/card.tsx](components/ui/card.tsx)

```tsx
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter, CardAction
} from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardDescription>描述</CardDescription>
  </CardHeader>
  <CardContent>内容</CardContent>
  <CardFooter>底部操作</CardFooter>
</Card>
```

**Card 外观特征（与 shadcn 默认一致）：**
- `rounded-xl` — 圆角
- `ring-1 ring-foreground/10` — 微弱边框
- `bg-card` — 卡片背景色
- 内边距由 `--card-spacing` CSS 变量控制

**首页中的"非标准 Card"模式：** 部分卡片使用 `rounded-xl border border-border/60 bg-card/50 backdrop-blur-md`，这是带毛玻璃效果的变体。如需要此效果，使用以下模式：

```tsx
<div className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-md p-4 transition-all duration-200 hover:border-primary/40">
  {/* 内容 */}
</div>
```

### 8.4 Badge

```tsx
import { Badge } from '@/components/ui/badge'

<Badge>默认</Badge>
<Badge variant="secondary">进行中</Badge>
<Badge variant="outline">草稿</Badge>
<Badge variant="destructive">已过期</Badge>
```

### 8.5 Tag

```tsx
import { Tag } from '@/components/ui/tag'

<Tag color="blue">开放世界</Tag>
<Tag color="amber" onRemove={() => {}}>可移除标签</Tag>
// color: 'blue' | 'teal' | 'amber' | 'purple' | 'neutral'
```

---

## 9. 布局体系

### 整体布局（三栏式）

```
┌──────────┬────────────────────────┬──────────┐
│ Sidebar  │  Main Content          │  Panel   │
│ w-64     │  flex-1                │  w-80    │
│          │  ┌─────────────────┐   │          │
│          │  │ TopBar (sticky) │   │          │
│          │  ├─────────────────┤   │          │
│          │  │ Content         │   │          │
│          │  │ max-w-4xl       │   │          │
│          │  │ mx-auto         │   │          │
│          │  └─────────────────┘   │          │
└──────────┴────────────────────────┴──────────┘
```

- Sidebar: `hidden lg:flex` — 桌面端固定，移动端 Drawer
- Panel: `hidden xl:flex` — 仅大屏显示
- Main: `flex-1 overflow-y-auto` — 占据剩余空间

### 移动端适配

- `< lg`（1024px）：Sidebar 折叠为 Drawer，通过 `useState` 控制
- `< xl`（1280px）：右侧 Panel 隐藏
- `< sm`（640px）：卡片网格从 2 列降为 1 列

---

## 10. 毛玻璃工具类

定义于 [app/globals.css](app/globals.css#L99-L103)：

```css
@utility glass {
  background: color-mix(in oklch, var(--card) 70%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
```

**使用场景：** TopBar、Sidebar、Dialog、ShowcaseSection

---

## 11. 设计约束

### 必须遵守
- 深色主题（`color-scheme: dark`）
- 所有页面继承首页设计语言
- 禁止修改整体布局、颜色体系、圆角、字体
- 禁止修改 Sidebar、TopBar、Card 样式
- 优先复用 `components/ui/` 中的 shadcn 组件
- 禁止重新设计 Button / Input

### 推荐实践
- 使用 Card 布局组织内容
- Hover 统一 `transition-all duration-200`
- 图标使用 `lucide-react`
- Section 标题：图标（`size-4 text-primary`）+ `text-sm font-semibold`
- 数据展示使用 `font-mono` + `tabular-nums`
- 装饰性光晕使用绝对定位 + blur + 低透明度主色

---

## 12. 公共组件清单

| 组件 | 路径 | 类型 |
|------|------|------|
| DashboardLayout | `components/dashboard-layout.tsx` | 布局 |
| AppSidebar | `components/app-sidebar.tsx` | 导航 |
| TopBar | `components/top-bar.tsx` | 导航 |
| WelcomeHero | `components/welcome-hero.tsx` | 业务 |
| RecentStrategies | `components/recent-strategies.tsx` | 业务 |
| FavoriteStrategies | `components/favorite-strategies.tsx` | 业务 |
| TodayPanel | `components/today-panel.tsx` | 业务 |
| Card | `components/ui/card.tsx` | 基础 |
| Button | `components/ui/button.tsx` | 基础 |
| Input | `components/ui/input.tsx` | 基础 |
| Badge | `components/ui/badge.tsx` | 基础 |
| Tag | `components/ui/tag.tsx` | 基础 |
| Avatar | `components/ui/avatar.tsx` | 基础 |
| Progress | `components/ui/progress.tsx` | 基础 |
| Tabs | `components/ui/tabs.tsx` | 基础 |
| Dialog | `components/ui/dialog.tsx` | 基础 |
| Drawer | `components/ui/drawer.tsx` | 基础 |
| Tooltip | `components/ui/tooltip.tsx` | 基础 |
| DropdownMenu | `components/ui/dropdown-menu.tsx` | 基础 |
| Checkbox | `components/ui/checkbox.tsx` | 基础 |
| Pagination | `components/ui/pagination.tsx` | 基础 |
| Breadcrumb | `components/ui/breadcrumb.tsx` | 基础 |
