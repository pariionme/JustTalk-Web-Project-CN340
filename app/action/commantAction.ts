import { db } from "@/lib/firebase";

export interface Comment {
  id: string;
  articleID: string;
  authorId: string;
  content: string;
  createdAt: string | null;
  updatedAt: string | null;

}

export function postComment() {

}
