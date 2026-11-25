import Link from 'next/link';
import { Suspense } from 'react';

async function DeletedMessage({
  searchParams,
}: {
  searchParams?: Promise<{ date?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const deletedDate = resolvedParams?.date;

  return (
    <p className="mt-3 text-gray-600 dark:text-gray-300">
      {deletedDate ? (
        <>
          The sacrament meeting scheduled for{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {deletedDate}
          </span>{' '}
          has been permanently removed.
        </>
      ) : (
        'The sacrament meeting has been permanently removed.'
      )}
    </p>
  );
}

export default function MeetingDeletedPage(props: {
  searchParams?: Promise<{ date?: string }>;
}) {
  return (
    <main className="mx-auto mt-10 max-w-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center shadow-sm">
      <div
        aria-hidden="true"
        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 text-xl font-bold"
      >
        ✓
      </div>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Sacrament Meeting Deleted
      </h1>

      <Suspense
        fallback={
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            The sacrament meeting has been permanently removed.
          </p>
        }
      >
        <DeletedMessage searchParams={props.searchParams} />
      </Suspense>

      <div className="mt-6">
        <Link
          href="/meetings"
          className="inline-block rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Back to All Meetings
        </Link>
      </div>
    </main>
  );
}