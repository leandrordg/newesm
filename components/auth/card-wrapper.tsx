"use client";

import { BackButton } from "@/components/auth/back-button";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtorHref: string;
  showSocial?: boolean;
}

export function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtorHref,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtorHref} />
      </CardFooter>
    </Card>
  );
}
