"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState<any>(null);

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
      await addDoc(collection(db, 'articles'), {
        title,
        content,
        authorId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert('Article created successfully!')
      router.push('/');
    } catch (error) {
      console.error("Error creating article:", error);
      alert("Failed to create article");
    } finally {
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
            className="bg-[#3D3027] hover:bg-[#2D2017] text-white rounded-full px-16 py-6 text-lg"
          >
            POST!
          </Button>
        </div>
      </main>
    </div>
  );
}
