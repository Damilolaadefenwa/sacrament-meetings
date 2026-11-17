/* This provides Next.js with a fallback Skeleton UI while data is loading.. 
*/

export default function MeetingsLoading() {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-pulse">
      {/* Search bar placeholder */}
      <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* 5 meeting card placeholders */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="p-5 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-3"
          >
            <div className="flex justify-between">
              <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}