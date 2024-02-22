"use server";

import * as z from "zod";
import bcryptjs from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendEmailVerification } from "@/lib/mail";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "E-mail já cadastrado!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendEmailVerification(verificationToken.email, verificationToken.token);

  return { success: "E-mail de confirmação enviado!" };
}
