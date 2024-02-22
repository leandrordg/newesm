"use server";

import * as z from "zod";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";

export async function reset(values: z.infer<typeof ResetSchema>) {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "E-mail inválido" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "E-mail não encontrado!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "E-mail enviado com sucesso!" };
}
