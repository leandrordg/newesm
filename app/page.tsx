import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500 to-blue-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-semibold text-white drop-shadow-md">
          ESM
        </h1>
        <p className="text-white">Rede social oficial da Etec</p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="secondary">Entrar</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
