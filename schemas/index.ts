import * as z from "zod";

import { UserRole } from "@prisma/client";

export const LoginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido!" }),
  password: z.string().min(1, { message: "Senha é obrigatória!" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "E-mail inválido!" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres obrigatórios!" }),
  name: z.string().min(3, { message: "Nome é obrigatório!" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "E-mail inválido!" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Mínimo 6 caracteres obrigatórios!" }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email({ message: "E-mail inválido!" })),
    password: z.optional(
      z.string().min(6, { message: "Mínimo 6 caracteres obrigatórios!" })
    ),
    newPassword: z.optional(
      z.string().min(6, { message: "Mínimo 6 caracteres obrigatórios!" })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "Nova senha é obrigatória!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Senha é obrigatória!",
      path: ["password"],
    }
  );
