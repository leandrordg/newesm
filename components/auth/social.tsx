"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { FaGoogle as GoogleLogoIcon } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <GoogleLogoIcon className="size-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <GitHubLogoIcon className="size-5" />
      </Button>
    </div>
  );
}
