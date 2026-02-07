import { notFound } from "next/navigation"


const articles = [
  {
    id: 1,
    author: "Will Locett",
    title: "The AI Bubble Is About To Burst, But The Next Bubble Is Already Growing",
    date: "Sep 15, 2025",
    content: `Speculation rules the world. It didn't used to. But from the 1980s through to 2008, 
    something changed. Investors realised that they could get far more return from hype than from 
    any kind of legitimate business. This is the information age, after all, and information is 
    easy to manipulate and commodify. This led to the dot-com bubble, the 2008 credit crunch, the 2016–2017 
    cryptocurrency bubble, the late 2020–2021 cryptocurrency bubble, and the 2022 NFT bubble, with the latest 
    fad being the AI bubble. In fact, nearly half of the world's private investment is being funnelled into AI, 
    and AI speculation is the main driving force behind the S&P 500's recent growth. But, 
    just as the others did before their catastrophic failure, the AI bubble is showing signs of imminent bursting. 
    However, the finance and tech bros have learnt their lesson and are developing the next bandwagon 
    to ride off into the sunset with all our money, ready for when they inevitably need to jump ship. It's just a shame that it's even more of a dead end than AI.`,
  },
  {
    id: 2,
    author: "Maya Chen",
    title: "Why We Feel Lonelier Even When We're Always Online",
    date: "Oct 2, 2025",
    content: `We've never been more connected, yet loneliness has reached epidemic proportions. 
    Social media promised to bring us closer together, but instead, 
    it's created a generation of people who have thousands of "friends" but no one to call 
    when they're struggling. The problem isn't technology itself—it's how we use it. We've replaced deep, 
    meaningful conversations with likes and comments. We've traded vulnerability for curated perfection. 
    And in doing so, we've lost something essential about what it means to be human. The path forward isn't to abandon technology, 
    but to be more intentional about how we use it to foster genuine connection.`,
  },
  {
    id: 3,
    author: "Ethan Brooks",
    title: "We Optimized Everything. Now We're Burnt Out.",
    date: "Aug 28, 2025",
    content: `Efficiency has become our religion. We optimize our workouts, our diets, our sleep, our productivity. 
    Every moment must be maximized, every minute accounted for. But somewhere along the way, we forgot that humans aren't machines. 
    We need rest that isn't "recovery." We need play that isn't "active recovery." We need conversations that don't have an agenda. 
    The constant pursuit of optimization has left us exhausted, anxious, and ironically, less productive than ever. 
    Maybe it's time to reconsider what we're optimizing for.`,
  },
  {
    id: 4,
    author: "Sofia Alvarez",
    title: "The Internet Never Forgets — But People Need To",
    date: "Jul 11, 2025",
    content: `In the age of screenshots and archives, every mistake becomes permanent. 
    A thoughtless tweet from a decade ago can resurface and destroy a career. 
    A youthful indiscretion can haunt someone forever. While accountability matters, 
    we've created a culture where growth and redemption seem impossible. 
    The internet's perfect memory clashes with the fundamentally human need to change, evolve, and be forgiven. 
    We need to find a balance between remembering important lessons and allowing people the space to become better versions of themselves.`,
  },
  {
    id: 5,
    author: "Daniel Kim",
    title: "Texting All Day, Saying Nothing: The Cost of Constant Communication",
    date: "Jun 19, 2025",
    content: `We send hundreds of messages a day. Quick texts, emoji reactions, GIF responses. 
    We're in constant contact with friends, family, and colleagues. But how many of those exchanges actually mean something? 
    The ease of digital communication has flooded our lives with noise while starving us of signal. 
    We've become experts at staying in touch while losing the art of truly connecting. Perhaps fewer, 
    more intentional conversations would leave us feeling more fulfilled than the endless stream of "hey" and "lol" that fills our days.`,
  },
  {
    id: 6,
    author: "Nina Patel",
    title: "Why Being 'Productive' All the Time Is Making Us Miserable",
    date: "May 6, 2025",
    content: `Somewhere along the way, rest became a dirty word. We feel guilty for doing nothing. We label relaxation as "lazy" and wear our busyness as a badge of honor. 
    But this cult of productivity is breaking us. Our bodies need rest. Our minds need space. 
    Our souls need activities that serve no purpose other than joy. 
    The most revolutionary act in our productivity-obsessed culture might just be doing nothing 
    at all—and refusing to feel bad about it.`,
  },
  {
    id: 7,
    author: "Lucas Meyer",
    title: "Sometimes the Best Conversation Is the One You Don't Rush",
    date: "Apr 22, 2025",
    content: `We've become uncomfortable with silence. Every pause must be filled. 
    Every conversation must move forward with purpose. But some of the most meaningful 
    moments happen in the spaces between words. When we allow conversations to breathe, 
    when we don't rush to fill every silence, something magical can happen. Thoughts deepen. 
    Trust builds. Real understanding emerges. In a world that demands constant stimulation, 
    choosing to slow down our conversations might be the most radical—and rewarding—choice we can make.`,
  },
]

interface PostPageProps {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params
  const article = articles.find((a) => a.id === Number.parseInt(id))

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">

      <main className="mx-auto max-w-3xl px-4 py-12">
        <article>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4 text-balance">
            {article.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {article.author} · {article.date}
          </p>
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground leading-relaxed text-base md:text-lg">
              {article.content}
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}
