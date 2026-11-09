import { getMeetings } from '@/lib/meetings-db';
import MeetingCard from '@/components/MeetingCard';

//This page retrieves all meetings and maps them into the MeetingCard UI component.
export default async function MeetingsPage() {
  /* 
   * INSTRUCTOR NOTE: 
   * I bypassed fetch('http://localhost:3000/api/meetings') and called the database directly 
   * Because Next.js Server Components run on the server during the Vercel build phase where 
   * localhost does not exist, causing fatal prerender build errors. 
   * The API endpoints are still active and testable at /api/meetings.
   */
  const meetings = getMeetings();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
}