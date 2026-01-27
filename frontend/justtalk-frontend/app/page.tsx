"use client"

import { Header } from "@/components/Header"
import { ArticleCard } from "@/components/article-card"

const articles = [
  {
    id: 1,
    author: "Will Lockett",
    title: "The AI Bubble Is About To Burst — And What Comes After Might Be Bigger",
    date: "Sep 15, 2025",
  },
  {
    id: 2,
    author: "Maya Chen",
    title: "Why We Feel Lonelier Even When We’re Always Online",
    date: "Oct 2, 2025",
  },
  {
    id: 3,
    author: "Ethan Brooks",
    title: "We Optimized Everything. Now We’re Burnt Out.",
    date: "Aug 28, 2025",
  },
  {
    id: 4,
    author: "Sofia Alvarez",
    title: "The Internet Never Forgets — But People Need To",
    date: "Jul 11, 2025",
  },
  {
    id: 5,
    author: "Daniel Kim",
    title: "Texting All Day, Saying Nothing: The Cost of Constant Communication",
    date: "Jun 19, 2025",
  },
  {
    id: 6,
    author: "Nina Patel",
    title: "Why Being ‘Productive’ All the Time Is Making Us Miserable",
    date: "May 6, 2025",
  },
  {
    id: 7,
    author: "Lucas Meyer",
    title: "Sometimes the Best Conversation Is the One You Don’t Rush",
    date: "Apr 22, 2025",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              author={article.author}
              title={article.title}
              date={article.date}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
