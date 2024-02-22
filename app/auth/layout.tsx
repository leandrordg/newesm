import { Metadata } from "next";

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
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500 to-blue-500">
      {children}
    </div>
  );
}
