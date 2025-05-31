import type { TicketStatus } from "@/types"
import { Badge } from "@/components/ui/badge"

interface TicketStatusBadgeProps {
  status: TicketStatus
}

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const statusStyles = {
    open: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    closed: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  }

  const statusLabels = {
    open: "Ochiq",
    "in-progress": "Jarayonda",
    resolved: "Hal Qilingan",
    closed: "Yopiq",
  }

  return (
    <Badge variant="outline" className={statusStyles[status]}>
      {statusLabels[status]}
    </Badge>
  )
}
