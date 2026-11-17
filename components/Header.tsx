"use client";
import Link from 'next/link';

const currentDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date());

export default function Header() {
  return (
    <header className="bg-blue-900 text-white p-4 sm:p-6 shadow-md dark:bg-gray-900 border-b border-transparent dark:border-gray-800 dark:shadow-none sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-center sm:text-left">
        <Link href="/" className="text-2xl font-bold hover:underline">
          Lekki Ward
        </Link>
        <p className="text-sm font-bold">{currentDate}</p>
      </div>
    </header>
  );
}