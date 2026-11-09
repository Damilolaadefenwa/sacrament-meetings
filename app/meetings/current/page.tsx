import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

//Declaring a new Date object to get the current date and time.
const today = new Date();

//This page doesn't render any HTML. It calculates the date of the most recent Sunday,
//checks the database, and instantly redirects the user.
export default async function CurrentMeetingPage() {
  // 1. Calculate the most recent Sunday
  const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  // 2. Format as YYYY-MM-DD to match the database
  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  // 3. Query the database for a meeting on this date
  const meetings = getMeetings(formattedDate);

  // 4. Redirect based on results
  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  } else {
    // Fallback to the main list if no meeting is scheduled for the current Sunday
    redirect('/meetings');
  }
}