import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; 
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Configuring the imported google font
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sacrament Meeting Planner',
  description: 'Plan and review sacrament meeting agendas',
};

//The master layout that wraps around each page component of the application. 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-us">
      {/*Applying the google font class globally */}
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-700`} suppressHydrationWarning>
        <Header />
        <main className="grow max-w-5xl mx-auto w-full p-4 sm:p-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}