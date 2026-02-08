"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/Header"

export default function ClientLayout({
  children,
  initialSession,
}: {
  children: React.ReactNode
  initialSession?: boolean
}) {
  const [isHydrated, setIsHydrated] = useState(false)
  useEffect(() => {
    // Read token from localStorage (client-only)
    setIsHydrated(true)
  }, [])

  // Prevent hydration mismatch
  if (!isHydrated) {
    return <>{children}</>
  }

  return (
    <>
        {/* ก็คือไม่ต้องใส่ Header ในแต่ละหน้าอีกต่อไปปปปปปปปปปปปปปปปปปปปปปปก */}
        <Header isLoggedIn={initialSession}/>
        {children}
    </>
  )
}