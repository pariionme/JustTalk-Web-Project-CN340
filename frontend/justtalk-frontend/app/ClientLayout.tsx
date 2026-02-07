"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/Header"

export default function ClientLayout({
  children,
  initialSession,
}: {
  children: React.ReactNode
  initialSession?: string
}) {
  const [isHydrated, setIsHydrated] = useState(false)
  const [session, setSession] = useState(initialSession)

  const isLoggedIn = Boolean(session);
  useEffect(() => {
    // Read token from localStorage (client-only)
    setIsHydrated(true)
    console.log('Session:', session, isLoggedIn)
  }, [session, isLoggedIn])

  // Prevent hydration mismatch
  if (!isHydrated) {
    return <>{children}</>
  }

  return (
    <>
        {/* ก็คือไม่ต้องใส่ Header ในแต่ละหน้าอีกต่อไปปปปปปปปปปปปปปปปปปปปปปปก */}
        <Header isLoggedIn={isLoggedIn}/>
        {children}
    </>
  )
}