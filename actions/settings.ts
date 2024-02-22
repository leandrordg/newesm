"use server";

import bcryptjs from "bcryptjs";
import * as z from "zod";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendEmailVerification } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";

export async function settings(values: z.infer<typeof SettingsSchema>) {
  const user = await currentUser();

  if (!user) {
    return { error: "Não autorizado!" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: "Não autorizado!" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email já está sendo utilizado!" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendEmailVerification(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Email de verificação enviado!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcryptjs.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) {
      return { error: "Senha incorreta!" };
    }

    const hashedPassword = await bcryptjs.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Configurações atualizadas!" };
}
