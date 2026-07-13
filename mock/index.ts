// ============================================================
// Mock Data — 统一数据服务层
//
// 所有 mock 数据的唯一入口。
// 组件应从此文件导入，而非直接导入各实体文件。
//
// 后续接入 FastAPI 时，只需替换此文件中的实现为 API 调用，
// 组件代码无需修改。
// ============================================================

// ---- 实体类型 ----
export type { Game, GameStatus } from './games'
export type { Guide, GuideStatus } from './guides'
export type { Section, SectionType, SectionTreeNode } from './sections'
export type { Character } from './characters'
export type { Boss, BossDifficulty } from './bosses'
export type { Map } from './maps'
export type { Location, LocationType } from './locations'
export type { Quest, QuestType, QuestStatus } from './quests'
export type { Item, ItemType, ItemRarity } from './items'
export type { TimelineEvent, TimelineEventType } from './timeline'
export type { Tag } from './tags'
export type { Attachment, AttachmentParent, AttachmentType } from './attachments'
export type { GuideRelation, ReferenceType } from './relations'
export type { Template, SectionTemplate } from './templates'
export type { Collection, CollectionItem } from './collections'

// ---- 实体数据 ----
export { games } from './games'
export { guides } from './guides'
export { sections } from './sections'
export { characters } from './characters'
export { bosses } from './bosses'
export { maps } from './maps'
export { locations } from './locations'
export { quests } from './quests'
export { items } from './items'
export { timelineEvents } from './timeline'
export { tags } from './tags'
export { attachments } from './attachments'
export { guideRelations } from './relations'
export { templates } from './templates'
export { collections, collectionItems } from './collections'

// ---- Game 辅助函数 ----
export { getGameById } from './games'

// ---- Guide 辅助函数 ----
export {
  getGuidesByGameId,
  statusLabels,
  statusColors,
} from './guides'

// ---- Section 辅助函数 ----
export {
  buildSectionTree,
  getWordCount,
} from './sections'

// ---- Character 辅助函数 ----
export { getCharacterById, getCharactersByGameId } from './characters'

// ---- Boss 辅助函数 ----
export { getBossById, getBossesByGameId } from './bosses'

// ---- Map 辅助函数 ----
export { getMapById, getMapsByGameId } from './maps'

// ---- Location 辅助函数 ----
export { getLocationById } from './locations'

// ---- Quest 辅助函数 ----
export { getQuestById, getQuestsByGameId } from './quests'

// ---- Item 辅助函数 ----
export { getItemById, getItemsByGameId } from './items'

// ---- Timeline 辅助函数 ----
export { getTimelineEventsByGameId } from './timeline'

// ---- Attachment 辅助函数 ----
export { getAttachmentsByParent } from './attachments'

// ---- GuideRelation 辅助函数 ----
export {
  getRelationsByGuideId,
  getRelationsGrouped,
} from './relations'
