"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TicketCard } from "./TicketCard"
import type { Ticket } from "@/types"
import { Button } from "../ui/button"
import { SearchIcon, PlusIcon } from "lucide-react"
import Link from "next/link"

interface TicketListProps {
  tickets: Ticket[]
}

export function TicketList({ tickets }: TicketListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="So'rovlarni qidirish..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Holat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha Holatlar</SelectItem>
              <SelectItem value="open">Ochiq</SelectItem>
              <SelectItem value="in-progress">Jarayonda</SelectItem>
              <SelectItem value="resolved">Hal Qilingan</SelectItem>
              <SelectItem value="closed">Yopiq</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button asChild>
          <Link href="/tickets/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            Yangi So'rov
          </Link>
        </Button>
      </div>

      {filteredTickets.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-lg border border-dashed">
          <h3 className="text-lg font-semibold">Hech qanday so'rov topilmadi</h3>
          <p className="text-muted-foreground">
            {searchQuery || statusFilter !== "all"
              ? "Qidiruv mezonlariga mos so'rov topilmadi."
              : "Sizda hali hech qanday so'rov yo'q."}
          </p>
          <Button asChild className="mt-4">
            <Link href="/tickets/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              Birinchi so'rovingizni yarating
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
