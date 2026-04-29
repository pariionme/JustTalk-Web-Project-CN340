// app/post/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-4 py-12">
        {/* A simple skeleton loading state */}
        <div className="h-10 w-3/4 bg-muted animate-pulse mb-4 rounded"></div>
        <div className="h-4 w-1/4 bg-muted animate-pulse mb-8 rounded"></div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-5/6 bg-muted animate-pulse rounded"></div>
        </div>
      </main>
    </div>
  );
}