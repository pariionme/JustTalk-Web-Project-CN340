"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/Header"

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="flex flex-col items-center px-4 pt-20 pb-16">
        <h1 className="text-5xl font-bold text-black tracking-wide mb-10">
          Welcome!
        </h1>
        <p className="text-center text-lg text-[#3D3D3D] tracking-wide mb-5 max-w-md">
          Create your account to start sharing your thoughts and ideas with the JustTalk community.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-base font-bold text-[#3D3D3D]">
              Your email
            </label>
            <input
              id="email"
              type="email"
              placeholder="enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 rounded-lg bg-[#E5E5E5] text-[#3D3D3D] placeholder:text-[#8A8A8A] border border-black focus:outline-none focus:ring-2 focus:ring-[#3D3D3D]/20"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="block text-base font-bold text-[#3D3D3D]">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-4 rounded-lg bg-[#E5E5E5] text-[#3D3D3D] placeholder:text-[#8A8A8A] border border-black focus:outline-none focus:ring-2 focus:ring-[#3D3D3D]/20"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-base font-bold text-[#3D3D3D]">
              Your password
            </label>
            <input
              id="password"
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 rounded-lg bg-[#E5E5E5] text-[#3D3D3D] placeholder:text-[#8A8A8A] border border-black focus:outline-none focus:ring-2 focus:ring-[#3D3D3D]/20"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-base font-bold text-[#3D3D3D]">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-4 rounded-lg bg-[#E5E5E5] text-[#3D3D3D] placeholder:text-[#8A8A8A] border border-black focus:outline-none focus:ring-2 focus:ring-[#3D3D3D]/20"
              required
            />
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-14 py-3 bg-[#452829] text-white text-base font-medium rounded-full tracking-widest hover:bg-[#2D2D2D] transition-colors"
            >
              create account
            </button>
          </div>
        </form>

        <div className="mt-20 text-center">
          <p className="text-sm text-[#3D3D3D]">
            <span className="font-medium">{"Already have an account? "}</span>
            <Link href="/signin" className="underline font-medium hover:text-[#2D2D2D]">
              Sign in
            </Link>
          </p>
          <p className="mt-3 text-xs text-[#3D3D3D]/80">
            {"By clicking \"Create account\", you accept JustTalk's "}
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>
            {" and "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  )
}