// ============================================================
// 共享标签映射 — 项目中所有中文标签的唯一数据源
//
// 规则：
// - 所有 LabelMap 集中在此定义
// - Card 组件、列表页、详情页均从此文件引入
// - 后续可替换为 i18n 或后端接口
// ============================================================

// ============================================================
// 难度
// ============================================================

export const difficultyLabels: Record<string, string> = {
  easy: '简单',
  normal: '普通',
  hard: '困难',
  extreme: '极难',
}

export function difficultyVariant(
  d: string,
): 'secondary' | 'default' | 'destructive' | 'outline' {
  if (d === 'extreme') return 'destructive'
  if (d === 'hard') return 'default'
  if (d === 'easy') return 'outline'
  return 'secondary'
}

// ============================================================
// 任务类型
// ============================================================

export const questTypeLabels: Record<string, string> = {
  main: '主线',
  side: '支线',
  faction: '阵营',
  daily: '日常',
  event: '活动',
  hidden: '隐藏',
}

// ============================================================
// 任务状态
// ============================================================

export const questStatusLabels: Record<string, string> = {
  not_started: '未开始',
  in_progress: '进行中',
  completed: '已完成',
  failed: '失败',
  blocked: '受阻',
}

export function questStatusVariant(
  s: string,
): 'secondary' | 'default' | 'destructive' | 'outline' {
  if (s === 'completed') return 'default'
  if (s === 'failed') return 'destructive'
  if (s === 'blocked') return 'outline'
  return 'secondary'
}

// ============================================================
// 道具类型
// ============================================================

export const itemTypeLabels: Record<string, string> = {
  weapon: '武器',
  armor: '防具',
  consumable: '消耗品',
  material: '材料',
  key_item: '关键道具',
  collectible: '收集品',
  currency: '货币',
  other: '其他',
}

// ============================================================
// 道具稀有度
// ============================================================

export const itemRarityLabels: Record<string, string> = {
  common: '普通',
  uncommon: '精良',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说',
}

export function rarityVariant(
  r: string,
): 'secondary' | 'default' | 'destructive' | 'outline' {
  if (r === 'legendary') return 'destructive'
  if (r === 'epic' || r === 'rare') return 'default'
  if (r === 'common') return 'outline'
  return 'secondary'
}

// ============================================================
// 时间线事件类型
// ============================================================

export const timelineTypeLabels: Record<string, string> = {
  plot: '剧情',
  version: '版本更新',
  guide_milestone: '攻略里程碑',
  personal: '个人记录',
}

// ============================================================
// 辅助：将 LabelMap 转为 select options（含 "全部"）
// ============================================================

export function toSelectOptions(labels: Record<string, string>, allLabel = '全部') {
  return Object.entries(labels).map(([value, label]) => ({ value, label }))
}

export function toSelectOptionsWithAll(
  labels: Record<string, string>,
  allLabel = '全部',
): { value: string; label: string }[] {
  return [{ value: 'all', label: allLabel }, ...toSelectOptions(labels, allLabel)]
}
