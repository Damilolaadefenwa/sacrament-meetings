import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <Link href={`/meetings/${meeting.id}`} className="block border rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800 dark:border-gray-700 w-full">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{meeting.date}</h2>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded uppercase tracking-wider font-bold whitespace-nowrap">
          {meeting.meetingType}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 truncate"><span className="font-semibold">Presiding:</span> {meeting.presiding}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 truncate"><span className="font-semibold">Conducting:</span> {meeting.conducting}</p>
    </Link>
  );
}