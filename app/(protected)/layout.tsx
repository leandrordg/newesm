import { NavbarProtected } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="h-full w-full flex flex-col lg:gap-y-10">
      <NavbarProtected />
      <div className="max-w-4xl mx-auto w-full p-4 lg:p-0">{children}</div>
    </div>
  );
}
