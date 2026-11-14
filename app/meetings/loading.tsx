/* This provides Next.js with a fallback UI while data is loading. 
 It will flash by instantly because we are using fast in-memory data,
  but it fulfills the assignment requirement. 
*/
export default function Loading() {
  return (
    <div className="flex justify-center items-center py-12">
      <p className="text-gray-500 font-medium text-lg animate-pulse">Loading meetings...</p>
    </div>
  );
}