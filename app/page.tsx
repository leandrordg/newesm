import Image from "next/image";
import background from "@/public/background.svg";

import { Navbar } from "@/components/navbar";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <Image
        src={background}
        alt="Background"
        className="fixed -z-10 object-cover"
        fill
      />

      <main className="flex flex-col h-full w-full px-2 pt-48">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col gap-6">
            <h1 className="drop-shadow uppercase font-bold text-4xl md:text-5xl lg:text-6xl">
              A rede social personalizável, <br />
              do seu{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500">
                estilo
              </span>
              , <br />
              do seu{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500">
                jeito
              </span>
              .
            </h1>

            <span className="font-medium text-muted-foreground text-xs">
              * Garanta o acesso antecipado agora mesmo
            </span>
          </div>

          <LoginButton asChild>
            <Button variant="theme" size="theme" className="mt-6">
              Entrar
            </Button>
          </LoginButton>
        </div>
      </main>
    </>
  );
}
