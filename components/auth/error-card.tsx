import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "@/components/auth/card-wrapper";

interface ErrorCardProps {}

export function ErrorCard({}: ErrorCardProps) {
  return (
    <CardWrapper
      headerLabel="Aconteceu algum erro!"
      backButtorHref="/auth/login"
      backButtonLabel="Voltar para o login"
    >
      <div className="flex justify-center w-full items-center">
        <ExclamationTriangleIcon className="size-6 text-destructive" />
      </div>
    </CardWrapper>
  );
}
