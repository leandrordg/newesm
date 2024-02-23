"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

interface NavbarProps {}

export function Navbar({}: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="px-6 py-3 fixed top-0 w-full">
      <div className="flex items-center flex-row gap-x-4 max-w-7xl mx-auto">
        <div className="flex-1">
          <Link
            href={"/"}
            className="hover:drop-shadow-md transition font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500"
          >
            ESM
          </Link>
        </div>

        <div className="text-muted hidden md:flex flex-row items-center">
          <Button
            variant="link"
            asChild
            className={pathname === "/" ? "text-white underline" : ""}
          >
            <Link href={"/"}>Início</Link>
          </Button>
          <Button
            variant="link"
            asChild
            className={
              pathname === "/atualizacoes" ? "text-white underline" : ""
            }
          >
            <Link href={"/atualizacoes"}>Atualizações</Link>
          </Button>
          <Button
            variant="link"
            asChild
            className={pathname === "/sobre" ? "text-white underline" : ""}
          >
            <Link href={"/sobre"}>Sobre nós</Link>
          </Button>
          <Button
            variant="link"
            asChild
            className={pathname === "/contato" ? "text-white underline" : ""}
          >
            <Link href={"/contato"}>Contato</Link>
          </Button>
        </div>

        <LoginButton asChild>
          <Button variant="theme" size="theme">
            Entrar
          </Button>
        </LoginButton>
      </div>
    </nav>
  );
}
