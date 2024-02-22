import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

interface PageProps {}

export default async function Page({}: PageProps) {
  const user = await currentUser();

  return <UserInfo user={user} label="Server Component"/>;
}
