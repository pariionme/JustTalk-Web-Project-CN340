"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { getArticleById } from "@/app/action/getArticleAction"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { clearHomeCache } from "@/app/action/clearCache"

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const { isLoggedIn, isHydrated, user } = useAuth()

  if (!isHydrated || !isLoggedIn) return null

  // // เช็คเจ้าของโพสต์ด้วยอีเมล ที่ ใช้บ่ได้ ใช้แค่ใน Editbutton แทน
  // if (user?.uid === article.authorId) return null

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isHydrated && !isLoggedIn) {
      router.push("/signin")
    }
  }, [isHydrated, isLoggedIn, router])

  // โหลดข้อมูลเดิม
  useEffect(() => {
    const fetchData = async () => {
      const article = await getArticleById(id)

      if (article) {
        setTitle(article.title)
        setContent(article.content)
      }
    }

    fetchData()
  }, [id])

  // save
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const postRef = doc(db, "articles", id);
      await updateDoc(postRef, {
        title: title,
        content: content,
        updatedAt: new Date(),
      });

      console.log("Article updated successfully!")

    } catch (e) {
      console.error("Error to edit article: ", e)
    } finally {
      console.log("updated:", { title, content })
      await clearHomeCache()
      setLoading(false)
      //use replace instead of push to prevent user go back after submit edit article
      router.replace(`/post/${id}`)
    }
  }

  if (!isHydrated) return null

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
        <h2 className="text-sm text-muted-foreground mb-4">Update your post below</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-3 rounded-lg h-40"
            placeholder="Write your content..."
          />

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#3D3027] text-white"
            >
              {loading ? "Saving..." : "Save"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
