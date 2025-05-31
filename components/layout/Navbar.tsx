"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Ticket, BookOpen, User, LogOut, Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ThemeToggle from "../themeToggle"
import { isAuthenticated, logout, getCurrentUser } from "@/lib/auth"
import { toast } from "sonner"
import type { User as UserType } from "@/types"

const authenticatedNavItems = [
  {
    name: "Mening Buyurtlarim",
    href: "/tickets",
    icon: <Ticket className="h-5 w-5" />,
  },
]

const publicNavItems = [
  {
    name: "Ma'lumot Bazasi",
    href: "/knowledge",
    icon: <BookOpen className="h-5 w-5" />,
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)

  // Function to check and update auth state
  const updateAuthState = () => {
    const authStatus = isAuthenticated()
    const user = getCurrentUser()
    setIsUserAuthenticated(authStatus)
    setCurrentUser(user)
  }

  useEffect(() => {
    // Initial check
    updateAuthState()

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "access_token" || e.key === "user") {
        updateAuthState()
      }
    }

    // Listen for custom auth events
    const handleAuthChange = () => {
      updateAuthState()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("authStateChanged", handleAuthChange)

    // Check auth state every 5 seconds to ensure UI is in sync
    const interval = setInterval(() => {
      updateAuthState()
    }, 5000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("authStateChanged", handleAuthChange)
      clearInterval(interval)
    }
  }, [])

  // Also check auth state when pathname changes
  useEffect(() => {
    updateAuthState()
  }, [pathname])

  const handleLogout = () => {
    logout()
    setIsUserAuthenticated(false)
    setCurrentUser(null)
    toast.success("Muvaffaqiyatli chiqildi")

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("authStateChanged"))

    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {isUserAuthenticated && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menyuni ochish/yopish</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <nav className="grid gap-2 py-6">
                  {isUserAuthenticated &&
                    authenticatedNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary",
                          pathname === item.href && "text-primary font-medium bg-muted",
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  {publicNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary",
                        pathname === item.href && "text-primary font-medium bg-muted",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  {isUserAuthenticated && (
                    <Button variant="ghost" className="justify-start px-3" onClick={handleLogout}>
                      <LogOut className="mr-2 h-5 w-5" />
                      <span>Chiqish</span>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          )}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Dern-Support</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {isUserAuthenticated &&
            authenticatedNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors",
                  pathname === item.href && "text-primary",
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          {publicNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors",
                pathname === item.href && "text-primary",
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isUserAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/profile">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profil</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden md:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Chiqish
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Kirish</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Ro'yxatdan o'tish</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
