'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

//UI component to create each page.
export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4"
    >
      <div>
        {currentPage > 1 && (
          <Link
            href={createPageURL(currentPage - 1)}
            aria-disabled={isFirstPage}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              isFirstPage
                ? 'pointer-events-none bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
            }`}
          >
            Previous
          </Link>
        )}
      </div>

      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      <div>
        {currentPage < totalPages && (
          <Link
            href={createPageURL(currentPage + 1)}
            aria-disabled={isLastPage}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              isLastPage
                ? 'pointer-events-none bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
            }`}
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}