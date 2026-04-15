"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"


export function CommentSection() {
  // const router = useRouter()
  const { isLoggedIn, isHydrated , user} = useAuth()
  
  
  // const [comments, setComments] = useState<string[]>([]) อันนี้ไม่มีชื่อยุสเส่อเนม
  const [comments, setComments] = useState< // แบบนี้มีชื่อยุสเซ่อเนม
    { text: string; username: string; createdAt: string }[]
  >([])
  const [input, setInput] = useState("")

  if (!isHydrated) {
    return <p className="text-gray-400">Loading...</p>
  }

  
  // const handleAddComment = () => { ไม่มีชื่อยุสเซ่อเนม
  //   if (!isLoggedIn) {
  //     router.push("/signin")
  //     return
  //   }

  //   if (!input.trim()) return

  //   setComments((prev) => [...prev, input])
  //   setInput("")
  // }
  const handleAddComment = () => {
    if (!input.trim()) return;

    setComments([
      ...comments,
      {
        text: input,
        username: user?.displayName || user?.email || "Anonymous", // Use username from auth context or default to "Anonymous"
        createdAt: new Date().toISOString(), // Optionally add a timestamp
      }
    ]);

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAddComment()
    }
  }

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-xl font-semibold mb-6 text-foreground">Comments</h2>
      
      {/* Input */}
      <div className="flex gap-3 mb-8">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            !isHydrated 
              ? "Loading..." 
              : isLoggedIn 
                ? "Write a comment..." 
                : "Sign in to comment"
          }
          disabled={!isLoggedIn || !isHydrated}
          className="flex-1 border-[#3D3027]/30 focus:border-[#3D3027]"
        />
        <Button
          onClick={handleAddComment}
          disabled={!isLoggedIn || !isHydrated} // disable button if not logged in or still loading จ้า
          className="bg-[#3D3027] hover:bg-[#2D2017] text-white rounded-full px-6"
        >
          Post
        </Button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-muted-foreground">No comments yet</p>
        ) : (
          // render each comment with username and createdAt
          comments.map((comment, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-muted/30"
            >
              {/* username */}
              <p className="text-sm text-muted-foreground mb-1">
                {comment.username}
              </p>
              {/* createdAt */}
              <p className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString()} 
              </p>
              {/* comment text */}
              <p className="text-foreground">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
