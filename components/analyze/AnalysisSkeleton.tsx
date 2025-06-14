// components/AnalysisSkeleton.tsx
export default function AnalysisSkeleton() {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Summary Skeleton */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>
  
        {/* Key Points Skeleton */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0 mt-0.5"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Topics Skeleton */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-8 bg-gray-200 rounded-full w-20"></div>
            ))}
          </div>
        </div>
  
        {/* Recommendations Skeleton */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-200 rounded flex-shrink-0 mt-0.5"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }