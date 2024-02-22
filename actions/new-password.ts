"use server";

import * as z from "zod";
import bcryptjs from "bcryptjs";

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export async function newPassword(
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) {
  if (!token) {
    return { error: "Token obrigatório faltando!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Token inválido!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token expirado!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "E-mail não encontrado!" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Senha alterada com sucesso!" };
}
