import type { TicketPriority } from "@/types"
import { Badge } from "@/components/ui/badge"

interface TicketPriorityBadgeProps {
  priority: TicketPriority
}

export function TicketPriorityBadge({ priority }: TicketPriorityBadgeProps) {
  const priorityStyles = {
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  const priorityLabels = {
    low: "Past",
    medium: "O'rta",
    high: "Yuqori",
    critical: "Juda Muhim",
  }

  return (
    <Badge variant="outline" className={priorityStyles[priority]}>
      {priorityLabels[priority]}
    </Badge>
  )
}
