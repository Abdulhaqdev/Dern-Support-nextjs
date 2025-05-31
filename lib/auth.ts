import type { User } from "@/types"
import { apiClient, type ApiUser, type ApiRegister } from "./api"

// Convert API user to frontend user format
const convertApiUserToUser = (apiUser: ApiUser): User => ({
  id: apiUser.id.toString(),
  name: `${apiUser.first_name} ${apiUser.last_name}`.trim() || apiUser.username,
  email: apiUser.email,
  phone: "", // API doesn't have phone field
  role: apiUser.role === "customer" ? "personal" : "business",
  createdAt: new Date().toISOString(),
})

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

// Helper function to dispatch auth state change event
const dispatchAuthStateChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("authStateChanged"))
  }
}

// Login function
export const login = async (username: string, password: string): Promise<{ user: User; token: string } | null> => {
  try {
    // Login and get tokens
    const authResponse = await apiClient.login(username, password)

    // Get user profile after successful login
    const apiUser = await apiClient.getProfile()
    const user = convertApiUserToUser(apiUser)

    // Store user data in localStorage and tokens in both localStorage and cookies
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("access_token", authResponse.access)
      localStorage.setItem("refresh_token", authResponse.refresh)

      // Also set cookies for middleware
      setCookie("access_token", authResponse.access, 7)
      setCookie("refresh_token", authResponse.refresh, 30)
    }

    // Dispatch auth state change event
    dispatchAuthStateChange()

    return { user, token: authResponse.access }
  } catch (error) {
    console.error("Login error:", error)
    return null
  }
}

// Register function
export const register = async (
  userData: {
    name: string
    email: string
    phone: string
    role: "personal" | "business"
    companyName?: string
    companySize?: number
  },
  password: string,
): Promise<{ user: User; token: string }> => {
  try {
    // Split name into first and last name
    const nameParts = userData.name.split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    // Prepare registration data
    const registerData: ApiRegister = {
      username: userData.email, // Use email as username
      email: userData.email,
      password,
      first_name: firstName,
      last_name: lastName,
    }

    // Create user via API
    await apiClient.register(registerData)

    // Login after registration to get tokens and user data
    const loginResult = await login(userData.email, password)
    if (!loginResult) {
      throw new Error("Failed to login after registration")
    }

    return loginResult
  } catch (error) {
    console.error("Registration error:", error)
    throw error
  }
}

// Logout function
export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")

    // Also delete cookies
    deleteCookie("access_token")
    deleteCookie("refresh_token")
  }

  // Dispatch auth state change event
  dispatchAuthStateChange()
}

// Get current user
export const getCurrentUser = (): User | null => {
  if (typeof window !== "undefined") {
    const userJson = localStorage.getItem("user")
    if (userJson) {
      try {
        return JSON.parse(userJson)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("user")
        return null
      }
    }
  }
  return null
}

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token")
    return !!token
  }
  return false
}

// Update user profile
export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) throw new Error("No current user")

    // Convert frontend user data to API format
    const apiUserData: Partial<ApiUser> = {
      email: userData.email,
      first_name: userData.name?.split(" ")[0] || "",
      last_name: userData.name?.split(" ").slice(1).join(" ") || "",
    }

    const updatedApiUser = await apiClient.partialUpdateProfile(apiUserData)
    const updatedUser = convertApiUserToUser(updatedApiUser)

    // Update stored user data
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    // Dispatch auth state change event
    dispatchAuthStateChange()

    return updatedUser
  } catch (error) {
    console.error("Profile update error:", error)
    throw error
  }
}
