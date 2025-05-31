"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/profile/ProfileForm"
import { ProfileSecurity } from "@/components/profile/ProfileSecurity"
import { ProfileNotifications } from "@/components/profile/ProfileNotifications"
import { UserIcon, ShieldCheck, Bell } from "lucide-react"
import { getCurrentUser, isAuthenticated } from "@/lib/auth"
import { useRouter } from "next/navigation"
import type { User } from "@/types"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profil")
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication on client side as well
    if (!isAuthenticated()) {
      router.push("/login?redirect=/profile")
      return
    }

    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    } else {
      // If no user data, redirect to login
      router.push("/login?redirect=/profile")
      return
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // This will be handled by the redirect in useEffect
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Hisob Sozlamalari</h1>

      <Tabs defaultValue="profil" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="profil" className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="xavfsizlik" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Xavfsizlik</span>
          </TabsTrigger>
          <TabsTrigger value="bildirishnomalar" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Bildirishnomalar</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profil">
          <ProfileForm user={user} />
        </TabsContent>

        <TabsContent value="xavfsizlik">
          <ProfileSecurity />
        </TabsContent>

        <TabsContent value="bildirishnomalar">
          <ProfileNotifications />
        </TabsContent>
      </Tabs>
    </div>
  )
}
