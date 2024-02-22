"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

interface AdminPageProps {}

export default function AdminPage({}: AdminPageProps) {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error("Server Action não permitida!");
      }

      if (data.success) {
        toast.success("Server Action permitida!");
      }
    });
  };

  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("API Route permitida!");
      } else {
        toast.error("API Route não permitida!");
      }
    });
  };

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="Você possui permissão para ver o conteúdo!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">API Routes para Administradores</p>
          <Button onClick={onApiRouteClick}>Clique para testar</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Server Actions para Administradores
          </p>
          <Button onClick={onServerActionClick}>Clique para testar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
