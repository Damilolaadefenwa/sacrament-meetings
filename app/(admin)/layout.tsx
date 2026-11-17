//placeholder content for the admin layout. 
// This is where the admin content will be displayed.

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <div className="mb-4 rounded-md bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 px-4 py-2 text-sm text-amber-800 dark:text-amber-200">
        Leader Portal (Authentication coming in Week 05)
      </div>
      {children}
    </section>
  );
}