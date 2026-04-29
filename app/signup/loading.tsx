export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <main className="flex flex-col items-center px-4 pt-20 pb-16">
        {/* Heading Skeleton (matches text-5xl "You're back!") */}
        <div className="h-12 w-64 bg-gray-200 animate-pulse mb-16 rounded-md"></div>

        <div className="w-full max-w-md space-y-8">
          {/* Email Input Skeleton */}
          <div className="space-y-2">
            {/* Label */}
            <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
            {/* Input field (matches py-4 padding height) */}
            <div className="w-full h-[58px] bg-[#E5E5E5] animate-pulse rounded-lg border border-gray-100"></div>
          </div>

          {/* Password Input Skeleton */}
          <div className="space-y-2">
            {/* Label */}
            <div className="h-5 w-32 bg-gray-200 animate-pulse rounded"></div>
            {/* Input field */}
            <div className="w-full h-[58px] bg-[#E5E5E5] animate-pulse rounded-lg border border-gray-100"></div>
          </div>

          {/* Submit Button Skeleton */}
          <div className="flex justify-center pt-6">
            <div className="h-12 w-[164px] bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        </div>

        {/* Footer Text Skeleton */}
        <div className="mt-20 flex flex-col items-center space-y-4 w-full">
          {/* "Already have an account? Sign up" */}
          <div className="h-4 w-56 bg-gray-200 animate-pulse rounded"></div>
          {/* Terms and Privacy Policy */}
          <div className="h-3 w-72 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </main>
    </div>
  );
}