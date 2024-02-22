import "@/app/globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import { auth } from "@/auth";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ESM - Etec Social Media",
  description:
    "ESM é uma rede social para alunos da Etec Polivalente de Americana.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="pt-BR">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
