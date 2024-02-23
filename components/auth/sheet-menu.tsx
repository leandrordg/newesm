"use client";

import Link from "next/link";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SheetMenuProps {
  pathname: string;
}

export function SheetMenu({ pathname }: SheetMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <HamburgerMenuIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="text-left">
          <SheetTitle>ESM</SheetTitle>
          <SheetDescription>Etec Social Media</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 py-6">
          <SheetClose asChild>
            <Button
              asChild
              variant={pathname === "/client" ? "default" : "outline"}
            >
              <Link href="/client">Cliente</Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              asChild
              variant={pathname === "/admin" ? "default" : "outline"}
            >
              <Link href="/admin">Admin</Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              asChild
              variant={pathname === "/settings" ? "default" : "outline"}
            >
              <Link href="/settings">Configurações</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
