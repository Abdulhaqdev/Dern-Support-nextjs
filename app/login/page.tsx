"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import LoginForm from "@/components/auth/LoginForm"
import { isAuthenticated } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirectTo = searchParams.get("redirect")

  useEffect(() => {
    // If already authenticated, redirect to intended page or home
    if (isAuthenticated()) {
      router.push(redirectTo || "/")
    }
  }, [router, redirectTo])

  return (
    <div className="container mx-auto py-16 px-4 md:py-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Kirish</h1>
        <LoginForm />
        {redirectTo && (
          <p className="text-sm text-muted-foreground text-center mt-4">Davom etish uchun tizimga kiring</p>
        )}
      </div>
    </div>
  )
}
