"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/Header"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Read token from localStorage (client-only)
    const token = localStorage.getItem("token")
    setIsLoggedIn(Boolean(token))
    setIsHydrated(true)
  }, [])

  // Prevent hydration mismatch
  if (!isHydrated) {
    return <>{children}</>
  }

  return (
    <>
        {/* ก็คือไม่ต้องใส่ Header ในแต่ละหน้าอีกต่อไปปปปปปปปปปปปปปปปปปปปปปปก */}
        <Header />
        {children}
    </>
  )
}