import { getMeetingById } from '@/lib/meetings-db';
import MeetingDetail from '@/components/MeetingDetails';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';


//This dynamic route pulls the ID from the URL and displays the full MeetingDetail UI component.
//If the ID doesn't exist, it triggers Next.js's built-in 404 page.

//This resolve the issue of rendering by next.js 13.4+
// 1. Create an async child component that awaits the URL params
async function MeetingDetailFetcher({ params }: { params: Promise<{ id: string }> }) {
  //Retrieving the ID from the URL and convert it to a number. 
  const { id } = await params;
  const meetingId = parseInt(id, 10);

  //Validating the meetingId to ensure it's a number. If not, trigger a 404 page.
  if (isNaN(meetingId)) {
    notFound();
  }

  //Fetching the meeting details using the ID. If no meeting is found, trigger a 404 page.
  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }
  //outputing the fetched meeting data with the MeetingDetail UI component.
  return <MeetingDetail meeting={meeting} />;
}

// 2. The main page component wraps the child fetcher in a Suspense boundary
export default function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="flex justify-center items-center py-12"><p className="text-gray-500 font-medium text-lg animate-pulse">Loading meeting details...</p></div>}>
      <MeetingDetailFetcher params={params} />
    </Suspense>
  );
}