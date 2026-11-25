import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <div className="mx-auto mt-12 max-w-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Meeting Not Found
      </h1>
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        The sacrament meeting you are trying to edit does not exist or may have been deleted.
      </p>
      <div className="mt-6">
        <Link
          href="/meetings"
          className="inline-block rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}