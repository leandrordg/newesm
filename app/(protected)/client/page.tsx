"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

interface PageProps {}

export default function Page({}: PageProps) {
  const user = useCurrentUser();

  return <UserInfo user={user} label="Client Component" />;
}
