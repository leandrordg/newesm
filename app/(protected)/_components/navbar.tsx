"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

interface NavbarProps {}

export function Navbar({}: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="bg-muted flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "secondary"}
        >
          <Link href="/server">Servidor</Link>
        </Button>
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
    </nav>
  );
}
