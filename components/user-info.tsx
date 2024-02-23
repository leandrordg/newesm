import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export async function UserInfo({ user, label }: UserInfoProps) {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-muted rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Nome</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-muted rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">E-mail</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-muted rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Cargo</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-muted rounded-md">
            {user?.role === "USER" ? "Usuário" : "Administrador"}
          </p>
        </div>
        {user?.isOAuth === false && (
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-medium">
              Autenticação de 2 fatores (2FA)
            </p>
            <Badge
              variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            >
              {user?.isTwoFactorEnabled ? "Ativado" : "Desativado"}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
