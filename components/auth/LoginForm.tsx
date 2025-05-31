"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { login } from "@/lib/auth"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Iltimos, foydalanuvchi nomini kiriting.",
  }),
  password: z.string().min(1, {
    message: "Parol kiritish shart.",
  }),
})

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const result = await login(values.username, values.password)

      if (result) {
        toast.success("Tizimga muvaffaqiyatli kirdingiz!")

        // Redirect to intended page or home after successful login
        // Use a single navigation method to avoid conflicts
        const destination = redirectTo || "/"

        // Use window.location for a clean navigation that ensures all state is refreshed
        window.location.href = destination
      } else {
        toast.error("Foydalanuvchi nomi yoki parol noto'g'ri.")
        setIsLoading(false)
      }
    } catch (error: any) {
      console.error("Login error:", error)
      if (error.message.includes("401")) {
        toast.error("Foydalanuvchi nomi yoki parol noto'g'ri.")
      } else {
        toast.error("Nimadir xato ketdi. Iltimos, qayta urinib ko'ring.")
      }
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Xush kelibsiz</CardTitle>
        <CardDescription>Dern-Support hisobingizga kiring.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foydalanuvchi nomi yoki Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
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

            <div className="text-sm">
              <Link href="#" className="text-primary hover:underline">
                Parolni unutdingizmi?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Kirilmoqda..." : "Kirish"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Hisobingiz yo'qmi?{" "}
          <Link
            href={`/register${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
            className="text-primary hover:underline"
          >
            Hisob yaratish
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
