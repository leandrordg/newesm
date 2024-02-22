"use server";

import * as z from "zod";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { sendEmailVerification, sendTwoFactorTokenEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export async function login(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "E-mail informado não existe!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendEmailVerification(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "E-mail de confirmação enviado!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Código inválido!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Código inválido!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Código expirado!", twoFactor: true };
      }

      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciais inválidas!" };
        default:
          return { error: "Erro desconhecido!" };
      }
    }

    throw error;
  }
}
