"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { SheetMenu } from "@/components/auth/sheet-menu";

interface NavbarProtectedNavbarProps {}

export function NavbarProtected({}: NavbarProtectedNavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="bg-muted px-6 py-3 w-full shadow-sm">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <div className="sm:hidden">
          <SheetMenu pathname={pathname} />
        </div>

        <div className="hidden sm:flex gap-x-2">
          <Button
            asChild
            variant={pathname === "/client" ? "default" : "secondary"}
          >
            <Link href="/client">Cliente</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "secondary"}
          >
            <Link href="/admin">Admin</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/settings" ? "default" : "secondary"}
          >
            <Link href="/settings">Configurações</Link>
          </Button>
        </div>
        <UserButton />
      </div>
    </nav>
  );
}
