// app/actions.ts
"use server"; // This is critical! It tells Next.js this runs on the server.

import { revalidatePath } from "next/cache";

export async function clearHomeCache() {
  // This instantly clears the cache for the home page
  revalidatePath("/");
}

export async function clearArticleCache(postId: string) {
  // This instantly clears the cache for the home page
  revalidatePath(`/post/${postId}`);
}
