"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthContextType {
  isLoggedIn: boolean
  isHydrated: boolean
  user: User | null
  signIn: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isHydrated: false,
  user: null,
  signIn: () => {},
  signOut: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setIsLoggedIn(Boolean(currentUser))
      setIsHydrated(true)
    })

    return () => unsubscribe()
  }, [])

  const signIn = () => {
    // This method is kept for compatibility but Firebase handles the actual sign in
  }

  const signOut = () => {
    // This method is kept for compatibility but Firebase handles the actual sign out
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isHydrated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
