import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import { EditMeetingForm } from '@/components/EditMeetingForm';

async function EditMeetingContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  return <EditMeetingForm meeting={meeting} />;
}

export default function EditMeetingPage(props: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Edit Sacrament Meeting
      </h1>

      <Suspense
        fallback={
          <div className="h-64 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
        }
      >
        <EditMeetingContent params={props.params} />
      </Suspense>
    </main>
  );
}