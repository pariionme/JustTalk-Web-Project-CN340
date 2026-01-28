"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

interface HeaderProps {
  isLoggedIn?: boolean
  setIsLoggedIn?: Dispatch<SetStateAction<boolean>>
}

export function Header({ isLoggedIn = false, setIsLoggedIn }: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const showBackButton = pathname !== "/"

  const handleSignOut = () => {
    localStorage.removeItem("token")
    setIsLoggedIn?.(false)
    router.push("/")
  }

  return (
    <header className="bg-cream">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-4xl font-light italic text-black"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.25)" }}
        >
          JustTalk
        </Link>

        {isLoggedIn ? (
          <div className="flex gap-3">
            <Link href="/post/create">
              <Button className="rounded-full bg-brown px-6 py-3 text-white text-sm font-medium tracking-widest hover:bg-[#785657] transition-colors">
                CREATE POST
              </Button>
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full bg-brown px-6 py-3 text-white text-sm font-medium tracking-widest hover:bg-[#785657] transition-colors"
            >
              SIGN OUT
            </button>
          </div>
        ) : showBackButton ? (
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full px-6 py-3 bg-brown text-white text-sm font-medium tracking-widest hover:bg-[#785657] transition-colors"
          >
            BACK
          </button>
        ) : (
          <Link href="/signin">
            <Button className="rounded-full px-6 py-3 bg-brown text-white text-sm font-medium tracking-widest hover:bg-[#785657] transition-colors">
              SIGN IN
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}