import NavLinks from '@/components/NavLinks';

//This adds my NavLinks component to every page inside the meetings folder.
export default function MeetingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <NavLinks />
      <div>{children}</div>
    </div>
  );
}