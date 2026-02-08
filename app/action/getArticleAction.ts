import { db } from "@/lib/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";

interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string | null;
  username: string;
}

interface User {
  id: string;
  username: string;
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const articleRef = doc(db, "articles", id);
    const snap = await getDoc(articleRef);

    if (!snap.exists()) {
      console.log(`Article ${id} not found`);
      return null;
    }

    const articleData = snap.data();
    const author = await getAuthorById(articleData.authorId);

    return {
      id: snap.id,
      title: articleData.title,
      content: articleData.content,
      authorId: articleData.authorId,
      createdAt:
        articleData.createdAt instanceof Timestamp
          ? articleData.createdAt.toDate().toISOString()
          : null,
      username: author?.username || "unknown",
    };
  } catch (error) {
    console.error("Get article by Id error:", error);
    return null;
  }
}

export async function getAuthorById(authorId: string): Promise<User | null> {
  try {
    if (!authorId) {
      console.warn("getAuthorById called with undefined or empty ID");
      return null;
    }
    const authorRef = doc(db, "users", authorId);
    const snap = await getDoc(authorRef);

    if (!snap.exists()) {
      console.log(`User ${authorId} not found`);
      return null;
    }

    const userData = snap.data();

    return {
      id: snap.id,
      username: userData.username,
    };
  } catch (error) {
    console.error("Get author by Id error:", error);
    return null;
  }
}
