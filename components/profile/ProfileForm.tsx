"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import type { User } from "@/types"
import { updateUserProfile } from "@/lib/auth"

interface ProfileFormProps {
  user: User
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Ism kamida 2 belgidan iborat bo'lishi kerak.",
  }),
  email: z.string().email({
    message: "Iltimos, to'g'ri elektron pochta manzilini kiriting.",
  }),
  phone: z.string().min(10, {
    message: "Iltimos, to'g'ri telefon raqamini kiriting.",
  }),
})

export function ProfileForm({ user }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await updateUserProfile(values)
      toast.success("Profil muvaffaqiyatli yangilandi!")
    } catch (error) {
      toast.error("Profilni yangilashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil Ma'lumotlari</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To'liq Ism</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Elektron Pochta</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon Raqami</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4" disabled={isLoading}>
              {isLoading ? "Saqlanmoqda..." : "O'zgarishlarni Saqlash"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
