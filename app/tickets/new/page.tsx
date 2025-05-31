"use client"

import { useEffect, useState } from "react"
import { TicketForm } from "@/components/tickets/TicketForm"
import { isAuthenticated } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function NewTicketPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication on client side as well
    if (!isAuthenticated()) {
      router.push("/login?redirect=/tickets/new")
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

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Yangi Yordam So'rovi Yaratish</h1>
      <TicketForm />
    </div>
  )
}
