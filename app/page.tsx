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

// 2. MAKE IT ASYNC: Remove "use client", useState, and useEffect
export default async function Home() {
  let pageArticles: Article[] = [];

  try {
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

    pageArticles = snapshot.docs.map((articleDoc) => {
      const articleData = articleDoc.data();
      const authorData = authorsMap[articleData.authorId];

      const createdAt =
        articleData.createdAt instanceof Timestamp
          ? articleData.createdAt.toDate()
          : null;
          
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

  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  // 3. NO LOADING STATE NEEDED: Server components render after fetching is done
  if (!pageArticles || pageArticles.length === 0) return <div>No articles found.</div>;

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col gap-6">
          {pageArticles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
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
