"use client"

import { useEffect, useState } from "react"
import { TicketList } from "@/components/tickets/TicketList"
import { type Ticket, convertApiTicketToTicket } from "@/types"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"
import { isAuthenticated } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication on client side as well
    if (!isAuthenticated()) {
      router.push("/login?redirect=/tickets")
      return
    }

    const fetchTickets = async () => {
      try {
        const apiTickets = await apiClient.getTickets()
        const convertedTickets = apiTickets.map(convertApiTicketToTicket)
        setTickets(convertedTickets)
      } catch (error) {
        console.error("Error fetching tickets:", error)
        toast.error("So'rovlarni yuklashda xatolik")
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [router])

  if (loading) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Mening Yordam So'rovlarim</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Mening Yordam So'rovlarim</h1>
      <TicketList tickets={tickets} />
    </div>
  )
}
