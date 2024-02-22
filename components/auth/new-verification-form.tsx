"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

interface NewVerificationFormProps {}

export function NewVerificationForm({}: NewVerificationFormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("O Token de verificação está faltando!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((error) => {
        setError("Ocorreu algum erro!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirmando o seu e-mail"
      backButtonLabel="Voltar para o login"
      backButtorHref="/auth/login"
    >
      <div className="flex flex-col gap-4 items-center w-full justify-center">
        {!success && !error && <BeatLoader color="gray" />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}
