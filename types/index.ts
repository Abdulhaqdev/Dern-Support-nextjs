// User types
export type UserRole = "business" | "personal"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  companyName?: string
  companySize?: number
  createdAt: string
}

// Ticket types
export type TicketStatus = "open" | "in-progress" | "resolved" | "closed"
export type TicketPriority = "low" | "medium" | "high" | "critical"
export type DeviceType = "laptop" | "desktop" | "tablet" | "mobile" | "other"

export interface Ticket {
  id: string
  userId: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  deviceType: DeviceType
  deviceInfo: string
  createdAt: string
  updatedAt: string
  assignedTo?: string
  attachments?: string[]
}

export interface TicketComment {
  id: string
  ticketId: string
  userId: string
  userName: string
  userRole: "customer" | "technician"
  content: string
  createdAt: string
}

// Knowledge base types
export interface KnowledgeArticle {
  id: string
  title: string
  category: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
  viewCount: number
}

// Quote/Pricing types
export interface RepairQuote {
  id: string
  ticketId: string
  diagnosisFee: number
  partsCost: number
  laborCost: number
  totalEstimate: number
  validUntil: string
  notes?: string
  createdAt: string
}

// Utility functions to convert between API and frontend types
import type { ApiTicket, ApiComment, ApiKnowledgeArticle, ApiRepairQuote } from "@/lib/api"

export const convertApiTicketToTicket = (apiTicket: ApiTicket): Ticket => ({
  id: apiTicket.id.toString(),
  userId: apiTicket.userId.toString(),
  title: apiTicket.title,
  description: apiTicket.description,
  status:
    apiTicket.status === "in_progress" ? "in-progress" : apiTicket.status === "closed" ? "resolved" : apiTicket.status,
  priority: apiTicket.priority === "high" ? "high" : apiTicket.priority === "medium" ? "medium" : "low",
  deviceType: apiTicket.device_type as DeviceType,
  deviceInfo: apiTicket.device_info,
  createdAt: apiTicket.created_at,
  updatedAt: apiTicket.updated_at,
  assignedTo: apiTicket.assignedTo,
})

export const convertTicketToApiTicket = (ticket: Partial<Ticket>) => ({
  title: ticket.title,
  description: ticket.description,
  device_type: ticket.deviceType,
  device_info: ticket.deviceInfo,
  priority: ticket.priority,
  status: ticket.status === "in-progress" ? "in_progress" : ticket.status,
})

export const convertApiCommentToComment = (apiComment: ApiComment): TicketComment => ({
  id: apiComment.id.toString(),
  ticketId: apiComment.ticketId.toString(),
  userId: apiComment.userId.toString(),
  userName: apiComment.userName,
  userRole: apiComment.userRole === "support_agent" ? "technician" : "customer",
  content: apiComment.content,
  createdAt: apiComment.created_at,
})

export const convertApiKnowledgeToKnowledge = (apiArticle: ApiKnowledgeArticle): KnowledgeArticle => ({
  id: apiArticle.id.toString(),
  title: apiArticle.title,
  category: apiArticle.category,
  content: apiArticle.content,
  tags: Array.isArray(apiArticle.tags) ? apiArticle.tags : [],
  createdAt: apiArticle.created_at,
  updatedAt: apiArticle.updated_at,
  viewCount: apiArticle.view_count,
})

export const convertApiQuoteToQuote = (apiQuote: ApiRepairQuote): RepairQuote => ({
  id: apiQuote.id.toString(),
  ticketId: apiQuote.ticketId.toString(),
  diagnosisFee: Number.parseFloat(apiQuote.diagnosis_fee),
  partsCost: Number.parseFloat(apiQuote.parts_cost),
  laborCost: Number.parseFloat(apiQuote.labor_cost),
  totalEstimate: Number.parseFloat(apiQuote.total_estimate),
  validUntil: apiQuote.valid_until,
  notes: apiQuote.notes,
  createdAt: apiQuote.created_at,
})
