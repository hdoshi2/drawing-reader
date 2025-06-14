// components/ConstructionDataSkeleton.tsx
export default function ConstructionDataSkeleton() {
    return (
      <div className="space-y-6">
        {/* Document Overview Skeleton */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="h-8 bg-blue-200 rounded w-12 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-blue-200 rounded w-20 mx-auto animate-pulse"></div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="h-6 bg-green-200 rounded w-24 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-green-200 rounded w-28 mx-auto animate-pulse"></div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="h-6 bg-purple-200 rounded w-8 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-purple-200 rounded w-20 mx-auto animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          </div>
        </div>
  
        {/* Table Skeleton */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-64 animate-pulse"></div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 bg-gray-300 rounded w-18 animate-pulse"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 bg-gray-300 rounded w-18 animate-pulse"></div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3, 4, 5, 6, 7].map((row) => (
                  <tr key={row} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="h-6 bg-blue-200 rounded-full w-28 animate-pulse"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-300 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-300 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-gray-300 rounded animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </div>
                        <div className="h-3 bg-blue-200 rounded w-20 animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Item Details Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((card) => (
            <div key={card} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="h-6 bg-green-200 rounded-full w-32 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-36 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5 mb-2 animate-pulse"></div>
              <div className="flex flex-wrap gap-2 text-xs">
                <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Project Recommendations Skeleton */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-orange-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-52 animate-pulse"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((rec) => (
              <div key={rec} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-200 rounded flex-shrink-0 mt-0.5 animate-pulse"></div>
                <div className="space-y-1 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Export Actions Skeleton */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="h-10 bg-blue-200 rounded-md w-28 animate-pulse"></div>
            <div className="h-10 bg-green-200 rounded-md w-36 animate-pulse"></div>
            <div className="h-10 bg-purple-200 rounded-md w-40 animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }