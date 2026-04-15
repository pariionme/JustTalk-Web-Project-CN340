"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"

interface EditButtonProps {
  postId: string
  articleUserId: string
}

export function EditButton({ postId, articleUserId }: EditButtonProps) {
    const { isLoggedIn, isHydrated, user } = useAuth()

    if (!isHydrated || !isLoggedIn) {
        return null
    }

    if (user?.uid !== articleUserId) return null

  return (
    <Button
      asChild
      variant="outline"
      className="bg-transparent border-[#3D3027] text-[#3D3027] hover:bg-[#3D3027] hover:text-white rounded-full px-6"
    >
      <Link href={`/post/${postId}/edit`}>Edit</Link>
    </Button>
  )
}