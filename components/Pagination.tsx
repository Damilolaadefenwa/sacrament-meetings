'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4"
    >
      <div>
        {isFirstPage ? (
          <span
            aria-disabled="true"
            className="inline-block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
          >
            Previous
          </span>
        ) : (
          <Link
            href={createPageURL(currentPage - 1)}
            className="inline-block rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors"
          >
            Previous
          </Link>
        )}
      </div>

      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      <div>
        {isLastPage ? (
          <span
            aria-disabled="true"
            className="inline-block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
          >
            Next
          </span>
        ) : (
          <Link
            href={createPageURL(currentPage + 1)}
            className="inline-block rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}