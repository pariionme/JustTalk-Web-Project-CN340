"use client";

import { ArticleCard } from "@/components/article-card";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string | null;
  username: string;
}

interface UserData {
  username: string;
}

// Dummy data for testing without Firebase
const articlesdummy = [
  {
    id: "1",
    author: "Will Lockett",
    title:
      "The AI Bubble Is About To Burst — And What Comes After Might Be Bigger",
    date: "Sep 15, 2025",
  },
  {
    id: "2",
    author: "Maya Chen",
    title: "Why We Feel Lonelier Even When We’re Always Online",
    date: "Oct 2, 2025",
  },
  {
    id: "3",
    author: "Ethan Brooks",
    title: "We Optimized Everything. Now We’re Burnt Out.",
    date: "Aug 28, 2025",
  },
  {
    id: "4",
    author: "Sofia Alvarez",
    title: "The Internet Never Forgets — But People Need To",
    date: "Jul 11, 2025",
  },
  {
    id: "5",
    author: "Daniel Kim",
    title:
      "Texting All Day, Saying Nothing: The Cost of Constant Communication",
    date: "Jun 19, 2025",
  },
  {
    id: "6",
    author: "Nina Patel",
    title: "Why Being ‘Productive’ All the Time Is Making Us Miserable",
    date: "May 6, 2025",
  },
  {
    id: "7",
    author: "Lucas Meyer",
    title: "Sometimes the Best Conversation Is the One You Don’t Rush",
    date: "Apr 22, 2025",
  },
];

export default function Home() {
  // Get title user date postID
  const [pageArticles, setPageArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try{

        const articlesRef = collection(db, "articles");
        const q = query(articlesRef, orderBy("createdAt", "desc"), limit(10));
        const snapshot = await getDocs(q);
        
        const authorIds = [
          ...new Set(snapshot.docs.map((doc) => doc.data().authorId as string)),
        ];
        
        const authorDocs = await Promise.all(
          authorIds.filter((id) => id).map((id) => getDoc(doc(db, "users", id))),
        );

        const authorsMap: Record<string, UserData> = {};
        authorDocs.forEach(authorDoc => {
          if (authorDoc.exists()) {
            authorsMap[authorDoc.id] = authorDoc.data() as UserData;
          }
        });

        const articles: Article[] = snapshot.docs.map((articleDoc) => {
          const articleData = articleDoc.data();
          const authorData = authorsMap[articleData.authorId];

          const createdAt =
            articleData.createdAt instanceof Timestamp
              ? articleData.createdAt.toDate()
              : null;
              
          // Format date
          const formattedDate = createdAt
            ? createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Unknown date";

          return {
            id: articleDoc.id,
            title: articleData.title,
            content: articleData.content,
            authorId: articleData.authorId,
            createdAt: formattedDate,
            username: authorData?.username || "unknown",
          };
        });


        setPageArticles(articles)
        setLoading(false)
      } catch (error) {
         console.error("Error fetching articles:", error);
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if(!pageArticles) return <div>No article found.</div>

  if(loading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col gap-6">
          {pageArticles.map((article) => (
            <ArticleCard
              key={article.id} // ← React uses this for list rendering
              id={article.id} // ← ArticleCard component uses this for the link ex.เวลากดไปดูโพสงิ้
              author={article.username}
              title={article.title}
              date={article.createdAt}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
