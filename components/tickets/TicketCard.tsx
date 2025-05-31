import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TicketStatusBadge } from "./TicketStatusBadge"
import { TicketPriorityBadge } from "./TicketPriorityBadge"
import type { Ticket } from "@/types"
import { formatDistanceToNow } from "date-fns"
import { uz } from "date-fns/locale"
import { Laptop, Monitor, Smartphone, Tablet, HardDrive } from "lucide-react"
import { Button } from "../ui/button"

interface TicketCardProps {
  ticket: Ticket
}

export function TicketCard({ ticket }: TicketCardProps) {
  const deviceIcons = {
    laptop: <Laptop className="h-4 w-4" />,
    desktop: <Monitor className="h-4 w-4" />,
    tablet: <Tablet className="h-4 w-4" />,
    mobile: <Smartphone className="h-4 w-4" />,
    other: <HardDrive className="h-4 w-4" />,
  }

  const createdAt = new Date(ticket.createdAt)
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true, locale: uz })

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-1">{ticket.title}</CardTitle>
          <TicketStatusBadge status={ticket.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{ticket.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="flex items-center text-xs text-muted-foreground">
            {deviceIcons[ticket.deviceType]}
            <span className="ml-1">{ticket.deviceInfo}</span>
          </div>
          <div className="flex items-center gap-2">
            <TicketPriorityBadge priority={ticket.priority} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{timeAgo} yaratilgan</div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/tickets/${ticket.id}`}>Batafsil Ko'rish</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
