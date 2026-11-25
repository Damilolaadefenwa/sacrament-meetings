import Link from 'next/link';
import { deleteMeetingAction } from '@/lib/actions';
import { SacramentMeeting } from '@/lib/types';

export function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  // const deleteWithId = deleteMeetingAction.bind(null, meeting.id);
  const deleteWithId = deleteMeetingAction.bind(null, meeting.id, meeting.date);

  return (
    <div className="w-full rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-5">
      <Link href={`/meetings/${meeting.id}`} className="block">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{meeting.date}</h2>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded uppercase tracking-wider font-bold whitespace-nowrap">
            {meeting.meetingType}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate"><span className="font-semibold">Presiding:</span> {meeting.presiding}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate"><span className="font-semibold">Conducting:</span> {meeting.conducting}</p>
      </Link>

      <div className="mt-4 flex items-center gap-3 border-t border-gray-200 dark:border-gray-700 pt-3">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          aria-label={`Edit meeting on ${meeting.date}`}
          className="rounded-md bg-gray-200 dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Edit
        </Link>

        <form action={deleteWithId}>
          <button
            type="submit"
            aria-label={`Delete meeting on ${meeting.date}`}
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}