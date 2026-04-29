"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/context/AuthContext"

interface DeleteButtonProps {
  postId: string
  articleUserId: string
}

export function DeleteButton({ postId, articleUserId }: DeleteButtonProps) {
  const router = useRouter()
  const { user, isHydrated } = useAuth()

  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // check owner of post
  if (!isHydrated || user?.uid !== articleUserId) return null

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "articles", postId))
      setShowConfirm(false)
      setShowSuccess(true)
    } catch (error) {
      console.error(error)
      alert("Delete failed")
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 size={20} />
      </button>

      {/* for sure */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg space-y-4 w-80">
            <p className="text-center font-medium text-lg">
              Are you sure you want to delete this post?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-full text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-full text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center space-y-4">
            <p>Post deleted successfully :D</p>

            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-[#3D3027] text-white rounded-full hover:bg-[#785657] transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}