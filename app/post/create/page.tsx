"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

export default function CreatePostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState<any>(null);

  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(user)
      } else {
        router.push("/signin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create an article");
      return;
    }
    if (!title || !content) {
      alert("Please input both title and content.");
      return;
    }

    // loading
    try {
      setLoading(true);

      await addDoc(collection(db, 'articles'), {
        title,
        content,
        authorId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setShowSuccess(true);
      // alert('Article created successfully!')
      // router.push('/');
      
    } catch (error) {
      console.error("Error creating article:", error);
      alert("Failed to create article");
    } finally {
      setLoading(false);
      //loading == false
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full text-5xl font-bold text-gray-400 placeholder:text-gray-400 bg-transparent border-none outline-none focus:text-[#3D3027] mb-6"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="tell your story."
          className="w-full h-96 text-xl text-gray-400 placeholder:text-gray-400 bg-transparent border-none outline-none resize-none focus:text-[#3D3027]"
        />

        <div className="flex justify-center mt-12">
          <Button
            onClick={handleSubmit}
            disabled={loading} // disable button while loading
            className="bg-[#3D3027] hover:bg-[#2D2017] text-white rounded-full px-16 py-6 text-lg"
          >
            POST!
          </Button>
        </div>

        {showSuccess && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg text-center space-y-4">
              <p>Post created successfully :D</p>

              <button
                onClick={() => router.push("/")}
                className="px-6 py-2 bg-[#3D3027] text-white rounded-full hover:bg-[#785657] transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
