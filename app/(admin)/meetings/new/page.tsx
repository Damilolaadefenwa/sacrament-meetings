import { Suspense } from 'react';
import { CreateMeetingForm } from '@/components/CreateMeetingForm';

export default function NewMeetingPage() {
  return (
    <main className="py-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Schedule Sacrament Meeting
      </h1>
      <Suspense fallback={
          <div className="h-11 w-full rounded-lg bg-gray-200 dark:bg-gray-700 mb-6 animate-pulse" />
        }>
        <CreateMeetingForm />
      </Suspense>
    </main>
  );
}






