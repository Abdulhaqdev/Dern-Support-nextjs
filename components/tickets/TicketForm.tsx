"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { DeviceType, TicketPriority } from "@/types"
import { apiClient } from "@/lib/api"

const deviceTypes: Array<{ value: DeviceType; label: string }> = [
  { value: "laptop", label: "Noutbuk" },
  { value: "desktop", label: "Kompyuter" },
  { value: "tablet", label: "Planshet" },
  { value: "mobile", label: "Mobil Qurilma" },
  { value: "other", label: "Boshqa" },
]

const priorities: Array<{ value: TicketPriority; label: string }> = [
  { value: "low", label: "Past" },
  { value: "medium", label: "O'rta" },
  { value: "high", label: "Yuqori" },
]

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Sarlavha kamida 5 belgidan iborat bo'lishi kerak.",
    })
    .max(100, {
      message: "Sarlavha 100 belgidan kam bo'lishi kerak.",
    }),
  description: z.string().min(20, {
    message: "Tavsif kamida 20 belgidan iborat bo'lishi kerak.",
  }),
  deviceType: z.enum(["laptop", "desktop", "tablet", "mobile", "other"]),
  deviceInfo: z.string().min(3, {
    message: "Iltimos, qurilma ma'lumotlarini kiriting.",
  }),
  priority: z.enum(["low", "medium", "high"]),
})

export function TicketForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      deviceType: "laptop",
      deviceInfo: "",
      priority: "medium",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await apiClient.createTicket({
        title: values.title,
        description: values.description,
        device_type: values.deviceType,
        device_info: values.deviceInfo,
        priority: values.priority,
      })

      toast.success("So'rov muvaffaqiyatli yaratildi!")
      router.push("/tickets")
    } catch (error) {
      toast.error("Nimadir xato ketdi. Iltimos, qayta urinib ko'ring.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yordam So'rovi Yaratish</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Muammo Sarlavhasi</FormLabel>
                  <FormControl>
                    <Input placeholder="Muammoingizni qisqacha tasvirlab bering" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="deviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qurilma Turi</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Qurilma turini tanlang" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {deviceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deviceInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qurilma Ma'lumotlari</FormLabel>
                    <FormControl>
                      <Input placeholder="Brend, model, OS versiyasi va h.k." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Muhimlik Darajasi</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Muhimlik darajasini tanlang" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batafsil Tavsif</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Iltimos, muammoingiz haqida imkon qadar ko'proq ma'lumot bering..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2 mt-6">
              <Input type="file" id="screenshots" className="hidden" />
              <Button type="button" variant="outline" onClick={() => document.getElementById("screenshots")?.click()}>
                Skrinshotlar Biriktirish (Ixtiyoriy)
              </Button>
              <p className="text-sm text-muted-foreground">Maksimal 3 ta fayl (har biri 5MB)</p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => router.push("/tickets")}>
                Bekor Qilish
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Yuborilmoqda..." : "So'rov Yuborish"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
