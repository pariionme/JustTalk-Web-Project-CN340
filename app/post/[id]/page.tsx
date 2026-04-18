import { getArticleById, getAuthorById } from "@/app/action/getArticleAction";
import { notFound } from "next/navigation";
import { CommentSection } from "@/components/CommentSection";
import { EditButton } from "@/components/EditBotton";
import { DeleteButton } from "@/components/DeleteComponent";


interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }



  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-4 py-12">
        <article>
          {/* Post Title and Edit Button */}
          <div className="flex items-start justify-between mb-4">  
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance">
              {article.title}
            </h1>

            <div className="flex items-center gap-2">
              <EditButton 
                postId={article.id} 
                articleUserId={article.authorId}
              />

              <DeleteButton
                postId={article.id}
                articleUserId={article.authorId}
              />
            </div>
          </div>

          {/* Format createdAt (ISO string) */}
          {(() => {
            const createdAt = article.createdAt ? new Date(article.createdAt) : null;
            const formattedDate = createdAt
              ? createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Unknown date";

            return (
              <p className="text-sm text-muted-foreground mb-8">
                {article.username ? article.username : "unknown"} · {formattedDate}
              </p>
            );
          })()}
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground leading-relaxed text-base md:text-lg">
              {article.content}
            </p>
          </div>
        </article>
        <CommentSection 
        id={id}
        />
      </main>
    </div>
  );
}
