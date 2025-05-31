"use client"

import { useState } from "react"
import { type Ticket, type TicketComment, convertApiCommentToComment } from "@/types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { TicketStatusBadge } from "./TicketStatusBadge"
import { TicketPriorityBadge } from "./TicketPriorityBadge"
import { formatDistanceToNow, format } from "date-fns"
import { uz } from "date-fns/locale"
import { MessageCircle, Paperclip, Send } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"

interface TicketDetailsProps {
  ticket: Ticket
  comments: TicketComment[]
}

export function TicketDetails({ ticket, comments: initialComments }: TicketDetailsProps) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [comments, setComments] = useState(initialComments)

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      const apiComment = await apiClient.createComment(ticket.id, newComment)
      const convertedComment = convertApiCommentToComment(apiComment)

      setComments((prev) => [...prev, convertedComment])
      setNewComment("")
      toast.success("Izoh muvaffaqiyatli qo'shildi")
    } catch (error) {
      console.error("Error submitting comment:", error)
      toast.error("Izoh qo'shishda xatolik")
    } finally {
      setIsSubmitting(false)
    }
  }

  const createdAt = new Date(ticket.createdAt)
  const updatedAt = new Date(ticket.updatedAt)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">So'rov #{ticket.id}</h1>
            <TicketStatusBadge status={ticket.status} />
            <TicketPriorityBadge priority={ticket.priority} />
          </div>
          <h2 className="text-xl font-semibold mb-2">{ticket.title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Chop Etish</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b bg-muted/50 p-4">
              <h3 className="font-semibold">Muammo Tavsifi</h3>
            </CardHeader>
            <CardContent className="p-4">
              <p className="whitespace-pre-line">{ticket.description}</p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Izohlar
            </h3>

            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{comment.userName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <div className="font-medium">{comment.userName}</div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(comment.createdAt), "d MMM, yyyy HH:mm", { locale: uz })}
                          </div>
                        </div>
                        <div className="text-sm">{comment.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">Hali izohlar yo'q.</div>
            )}

            <div className="pt-4">
              <Textarea
                placeholder="Izoh qo'shish..."
                className="min-h-24 mb-2"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Biriktirish
                </Button>
                <Button onClick={handleSubmitComment} disabled={!newComment.trim() || isSubmitting}>
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b bg-muted/50 p-4">
              <h3 className="font-semibold">So'rov Ma'lumotlari</h3>
            </CardHeader>
            <CardContent className="p-4">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Holat</dt>
                  <dd>
                    <TicketStatusBadge status={ticket.status} />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Muhimlik</dt>
                  <dd>
                    <TicketPriorityBadge priority={ticket.priority} />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Yuborilgan</dt>
                  <dd className="font-medium">
                    {format(createdAt, "d MMM, yyyy HH:mm", { locale: uz })}
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(createdAt, { addSuffix: true, locale: uz })}
                    </div>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Oxirgi Yangilanish</dt>
                  <dd className="font-medium">{format(updatedAt, "d MMM, yyyy HH:mm", { locale: uz })}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Tayinlangan</dt>
                  <dd className="font-medium">{ticket.assignedTo || "Hali tayinlanmagan"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b bg-muted/50 p-4">
              <h3 className="font-semibold">Qurilma Ma'lumotlari</h3>
            </CardHeader>
            <CardContent className="p-4">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Qurilma Turi</dt>
                  <dd className="font-medium capitalize">{ticket.deviceType}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Qurilma Tafsilotlari</dt>
                  <dd className="font-medium">{ticket.deviceInfo}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
