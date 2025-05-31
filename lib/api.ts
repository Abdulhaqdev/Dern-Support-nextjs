// API client for Dern Support API
const API_BASE_URL = "https://dern-api.mirmakhmudoff.uz/api"

// Types matching the API schema exactly
export interface ApiUser {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  role: "customer" | "support_agent"
}

export interface ApiRegister {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
}

export interface ApiTokenObtainPair {
  username: string
  password: string
  access?: string
  refresh?: string
}

export interface ApiTokenRefresh {
  refresh: string
  access: string
}

export interface ApiTicket {
  id: number
  userId: number
  title: string
  description: string
  status: "open" | "in_progress" | "closed"
  priority: "low" | "medium" | "high"
  device_type: string
  device_info: string
  created_at: string
  updated_at: string
  assignedTo: string
}

export interface ApiComment {
  id: number
  ticketId: number
  userId: number
  userName: string
  userRole: string
  content: string
  created_at: string
}

export interface ApiKnowledgeArticle {
  id: number
  title: string
  category: string
  content: string
  tags: string[] | object // API might return array or object
  created_at: string
  updated_at: string
  view_count: number
}

export interface ApiRepairQuote {
  id: number
  ticketId: number
  diagnosis_fee: string
  parts_cost: string
  labor_cost: string
  total_estimate: string
  valid_until: string
  notes?: string
  created_at: string
}

export interface ApiAppointment {
  id: number
  ticket: number
  user: number
  slot: number
  date: string
  start_time: string
  end_time: string
  status: string
  created_at: string
}

export interface ApiScheduleSlot {
  id: number
  date: string
  start_time: string
  end_time: string
  available: boolean
}

// Helper function to get cookie value
const getCookie = (name: string): string | null => {
  if (typeof document !== "undefined") {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  }
  return null
}

// Helper function to set cookie
const setCookie = (name: string, value: string, days = 7) => {
  if (typeof document !== "undefined") {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
  }
}

// Helper function to delete cookie
const deleteCookie = (name: string) => {
  if (typeof document !== "undefined") {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
  }
}

class ApiClient {
  private baseURL = API_BASE_URL

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken()

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, config)

    if (!response.ok) {
      if (response.status === 401) {
        this.clearAuth()
        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }
      }
      const errorText = await response.text()
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return {} as T
    }

    return response.json()
  }

  private getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token") || getCookie("access_token")
    }
    return null
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", accessToken)
      localStorage.setItem("refresh_token", refreshToken)

      // Also set cookies for middleware
      setCookie("access_token", accessToken, 7)
      setCookie("refresh_token", refreshToken, 30)
    }
  }

  private clearAuth(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user")

      // Also delete cookies
      deleteCookie("access_token")
      deleteCookie("refresh_token")
    }
  }

  // Auth endpoints
  async login(username: string, password: string): Promise<{ access: string; refresh: string }> {
    const response = await this.request<{ access: string; refresh: string }>("/login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })

    this.setTokens(response.access, response.refresh)
    return response
  }

  async register(userData: ApiRegister): Promise<ApiRegister> {
    return this.request<ApiRegister>("/register/", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async refreshToken(): Promise<{ access: string }> {
    const refreshToken =
      typeof window !== "undefined" ? localStorage.getItem("refresh_token") || getCookie("refresh_token") : null
    if (!refreshToken) throw new Error("No refresh token")

    const response = await this.request<{ access: string }>("/token/refresh/", {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", response.access)
      setCookie("access_token", response.access, 7)
    }
    return response
  }

  // Profile endpoints
  async getProfile(): Promise<ApiUser> {
    return this.request<ApiUser>("/profile/")
  }

  async updateProfile(userData: Partial<ApiUser>): Promise<ApiUser> {
    return this.request<ApiUser>("/profile/", {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  }

  async partialUpdateProfile(userData: Partial<ApiUser>): Promise<ApiUser> {
    return this.request<ApiUser>("/profile/", {
      method: "PATCH",
      body: JSON.stringify(userData),
    })
  }

  // Tickets endpoints
  async getTickets(): Promise<ApiTicket[]> {
    return this.request<ApiTicket[]>("/tickets/")
  }

  async getTicket(id: string): Promise<ApiTicket> {
    return this.request<ApiTicket>(`/tickets/${id}/`)
  }

  async createTicket(ticketData: {
    title: string
    description: string
    device_type: string
    device_info: string
    priority?: "low" | "medium" | "high"
  }): Promise<ApiTicket> {
    return this.request<ApiTicket>("/tickets/", {
      method: "POST",
      body: JSON.stringify(ticketData),
    })
  }

  async updateTicket(id: string, ticketData: Partial<ApiTicket>): Promise<ApiTicket> {
    return this.request<ApiTicket>(`/tickets/${id}/`, {
      method: "PUT",
      body: JSON.stringify(ticketData),
    })
  }

  async deleteTicket(id: string): Promise<void> {
    return this.request<void>(`/tickets/${id}/`, {
      method: "DELETE",
    })
  }

  // Comments endpoints
  async getTicketComments(ticketId: string): Promise<ApiComment[]> {
    return this.request<ApiComment[]>(`/tickets/${ticketId}/comments/`)
  }

  async createComment(ticketId: string, content: string): Promise<ApiComment> {
    return this.request<ApiComment>(`/tickets/${ticketId}/comments/`, {
      method: "POST",
      body: JSON.stringify({ content }),
    })
  }

  // Knowledge base endpoints
  async getKnowledgeArticles(): Promise<ApiKnowledgeArticle[]> {
    return this.request<ApiKnowledgeArticle[]>("/knowledge/")
  }

  async getKnowledgeArticle(id: string): Promise<ApiKnowledgeArticle> {
    return this.request<ApiKnowledgeArticle>(`/knowledge/${id}/`)
  }

  // Quote endpoints
  async getRepairQuote(ticketId: string): Promise<ApiRepairQuote> {
    return this.request<ApiRepairQuote>(`/quote/${ticketId}/`)
  }

  // Schedule endpoints
  async getScheduleSlots(): Promise<ApiScheduleSlot[]> {
    return this.request<ApiScheduleSlot[]>("/schedule/slots/")
  }

  async createAppointment(appointmentData: {
    ticket: number
    slot: number
    date: string
    start_time: string
    end_time: string
  }): Promise<ApiAppointment> {
    return this.request<ApiAppointment>("/schedule/", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    })
  }

  async getAppointment(ticketId: string): Promise<ApiAppointment> {
    return this.request<ApiAppointment>(`/schedule/${ticketId}/`)
  }
}

export const apiClient = new ApiClient()
