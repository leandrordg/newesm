import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendTwoFactorTokenEmail(email: string, token: string) {
  await resend.emails.send({
    from: "mail@newesm.tech",
    to: email,
    subject: "Autenticação de 2 fatores",
    html: `<p>Seu código de autenticação de 2 fatores é: ${token}</p>`,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@newesm.tech",
    to: email,
    subject: "Redefinir a sua senha",
    html: `<p>Clique <a href="${resetLink}">aqui</a> para redefinir a sua senha agora!</p>`,
  });
}

export async function sendEmailVerification(email: string, token: string) {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "mail@newesm.tech",
    to: email,
    subject: "Confirme seu e-mail",
    html: `<p>Clique <a href="${confirmLink}">aqui</a> para confirmar o seu e-mail!</p>`,
  });
}
