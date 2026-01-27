import { Star } from "lucide-react"

interface ArticleCardProps {
  author: string
  title: string
  date: string
}

export function ArticleCard({ author, title, date }: ArticleCardProps) {
  return (
    <article className="
      cursor-pointer
      bg-white
      py-6 pl-6 pr-4
      border border-gray-200
      border-l-4 border-l-brown/20
      rounded-lg
      transition-all
      hover:shadow-md
    ">
      <p className="text-sm text-muted-foreground">{author}</p>
      <h2 className="mt-1 text-2xl font-bold leading-tight text-foreground">
        {title}
      </h2>
      <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Star className="h-3.5 w-3.5 fill-current" />
        <span>{date}</span>
      </div>
    </article>
  )
}
