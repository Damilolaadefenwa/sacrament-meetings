
const currentYear = new Date().getFullYear(); 

export default function Footer() {
  return (
    <footer className="bg-blue-900 dark:bg-gray-900 text-white py-6 mt-auto border-t border-transparent dark:border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-none">
      <div className="container mx-auto text-center px-4">
        <p className="text-sm font-bold leading-relaxed">
            &copy; {currentYear} | Sacrament Meeting Planner <br className="sm:hidden" />
            <span className="hidden sm:inline"> | </span> Damilola Adefenwa | All rights reserved    
        </p>
      </div>
    </footer>
  );
}