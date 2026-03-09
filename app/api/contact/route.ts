import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
    }

    // Envoi de l'email via Resend
    const data = await resend.emails.send({
      from: "Funda Contact <info@funda-online.com>", // ton domaine vérifié
      to: "info@funda-online.com", // où tu veux recevoir les messages
      replyTo: email, // permet de répondre directement à l’expéditeur
      subject: `📩 Nouveau message : ${subject}`,
      html: `
        <h2>Nouveau message depuis le formulaire de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <p><strong>Message :</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Erreur envoi email:", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi du message." }, { status: 500 });
  }
}
