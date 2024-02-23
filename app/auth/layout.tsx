import { Metadata } from "next";
import Image from "next/image";

import background from "@/public/background.svg";

export const metadata: Metadata = {
  title: "ESM - Autenticação",
  description: "Faça login ou crie uma conta para acessar a Etec Social Media.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center relative">
      <Image
        src={background}
        alt="Background"
        className="fixed -z-10 object-cover"
        fill
      />
      {children}
    </div>
  );
}
