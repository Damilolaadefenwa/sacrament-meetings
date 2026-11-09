import Image from 'next/image';
import Link from 'next/link';

//The application landing/home page
export default function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-8">
      
      {/* Implemented image: removed dark:invert and opacity */}
      <div className="w-full max-w-5xl mx-auto rounded-b-lg overflow-hidden shadow-md mb-4">
        <Image 
          src="/sacramenthero.webp" 
          alt="Sacrament Meeting"
          width={1080}
          height={720}
          priority
          className="w-full h-auto object-cover max-h-120"
        />
      </div>

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Sacrament Meeting Planner</h1>
      
      <p className="text-lg max-w-2xl text-gray-600 dark:text-gray-300">
        Manage weekly agendas, track announcements, and easily print programs for the ward.
      </p>
      
      <Link 
        href="/meetings" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
      >
        View Meetings
      </Link>
    </div>
  );
}