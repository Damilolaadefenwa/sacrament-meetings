//Navigation links for the header.
// Using "use client" & usePathname directive to be able to read the current URL
// path and apply active styling.

"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

// 1. Move the hook and logic into an internal component
function NavList() {
  const pathname = usePathname();
  
  const links = [
    { name: 'All Meetings', href: '/meetings' },
    { name: 'Current Sunday', href: '/meetings/current' },
  ];

  return (
    <nav aria-label="Meetings navigation" className="bg-white dark:bg-gray-800 border-b p-4 shadow-sm mb-6 rounded-lg">
      <ul className="flex space-x-6">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.name}>
              <Link 
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`font-semibold transition-colors ${
                  isActive 
                    ? 'text-blue-900 dark:text-blue-400 underline' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// 2. Export a default component that wraps the internal one in Suspense
export default function NavLinks() {
  return (
    <Suspense fallback={<div className="h-14.5 bg-white dark:bg-gray-800 border-b shadow-sm mb-6 rounded-lg animate-pulse" />}>
      <NavList />
    </Suspense>
  );
}