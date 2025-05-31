"use client"

import { useEffect, useState } from "react"
import { TicketDetails } from "@/components/tickets/TicketDetails"
import { type Ticket, type TicketComment, convertApiTicketToTicket, convertApiCommentToComment } from "@/types"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"
import { notFound } from "next/navigation"

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [comments, setComments] = useState<TicketComment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const [apiTicket, apiComments] = await Promise.all([
          apiClient.getTicket(params.id),
          apiClient.getTicketComments(params.id),
        ])

        setTicket(convertApiTicketToTicket(apiTicket))
        setComments(apiComments.map(convertApiCommentToComment))
      } catch (error) {
        console.error("Error fetching ticket data:", error)
        toast.error("So'rov ma'lumotlarini yuklashda xatolik")
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchTicketData()
  }, [params.id])

  if (loading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!ticket) {
    notFound()
  }

  return (
    <div className="container py-10">
      <TicketDetails ticket={ticket} comments={comments} />
    </div>
  )
}
