import Link from 'next/link';
import { Suspense } from 'react';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import { MeetingCard } from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';

async function MeetingsListContent({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const query = (resolvedParams?.query ?? '').trim().slice(0, 100);
  const parsedPage = Number(resolvedParams?.page);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage >= 1 ? Math.floor(parsedPage) : 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <>
      {meetings.length === 0 ? (
        <p className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6 text-center text-gray-600 dark:text-gray-300">
          No sacrament meetings found matching &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="space-y-4">
          {meetings.map((m) => (
            <MeetingCard key={m.id} meeting={m} />
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </>
  );
}

export default function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Sacrament Meetings
      </h1>

      <Link
        href="/meetings/new"
        className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        + New Meeting
      </Link>

      <Suspense
        fallback={
          <div className="h-11 w-full rounded-lg bg-gray-200 dark:bg-gray-700 mb-6 animate-pulse" />
        }
      >
        <MeetingSearch />
      </Suspense>

      <Suspense
        fallback={
          <p className="text-gray-500 animate-pulse">Loading meetings...</p>
        }
      >
        <MeetingsListContent searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}