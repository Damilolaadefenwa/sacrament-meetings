'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Meetings route error:', error);
  }, [error]);

  return (
    <div
      role="alert"
      className="mx-auto mt-12 max-w-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-center shadow-sm"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Something went wrong!
      </h1>
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        {error.message || 'An unexpected error occurred while loading meetings.'}
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}