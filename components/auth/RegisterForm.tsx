"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { register } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Ism kamida 2 belgidan iborat bo'lishi kerak.",
    }),
    email: z.string().email({
      message: "Iltimos, to'g'ri elektron pochta manzilini kiriting.",
    }),
    phone: z.string().min(10, {
      message: "Iltimos, to'g'ri telefon raqamini kiriting.",
    }),
    password: z.string().min(8, {
      message: "Parol kamida 8 belgidan iborat bo'lishi kerak.",
    }),
    confirmPassword: z.string(),
    role: z.enum(["personal", "business"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Parollar mos kelmaydi",
    path: ["confirmPassword"],
  })

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "personal",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const userData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        role: values.role,
      }

      await register(userData, values.password)

      toast.success("Hisob muvaffaqiyatli yaratildi!")

      // Get redirect parameter from URL if present
      const params = new URLSearchParams(window.location.search)
      const redirectTo = params.get("redirect") || "/"

      // Use window.location for a clean navigation that ensures all state is refreshed
      window.location.href = redirectTo
    } catch (error: any) {
      console.error("Registration error:", error)
      if (error.message.includes("400")) {
        toast.error("Bu email manzili allaqachon ro'yxatdan o'tgan.")
      } else {
        toast.error("Nimadir xato ketdi. Iltimos, qayta urinib ko'ring.")
      }
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Hisob Yaratish</CardTitle>
        <CardDescription>
          IT qo'llab-quvvatlash xizmatlaridan foydalanish uchun Dern-Support'da ro'yxatdan o'ting.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Hisob Turi</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="personal" id="personal" />
                        <FormLabel htmlFor="personal" className="font-normal">
                          Shaxsiy
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="business" id="business" />
                        <FormLabel htmlFor="business" className="font-normal">
                          Biznes
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To'liq Ism</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                    <Input type="email" placeholder="john@example.com" {...field} />
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
                    <Input placeholder="+998 90 123 45 67" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parol</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parolni Tasdiqlash</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Hisob yaratilmoqda..." : "Hisob Yaratish"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Hisobingiz bormi?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Kirish
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
