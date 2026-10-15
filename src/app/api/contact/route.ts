import { NextResponse } from "next/server";
import { services } from "@/data/content";
export async function POST(request: Request) {
  if (Number(request.headers.get("content-length")) > 12000)
    return NextResponse.json({ error: "Message too large." }, { status: 413 });
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host"))
        return NextResponse.json(
          { error: "Invalid request origin." },
          { status: 403 },
        );
    } catch {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 },
      );
    }
  }
  let body;
  try {
    const text = await request.text();
    if (text.length > 12000)
      return NextResponse.json(
        { error: "Message too large." },
        { status: 413 },
      );
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object")
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const { name, email, service, message } = body;
  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.length > 100 ||
    typeof email !== "string" ||
    email.length > 254 ||
    !/^([^\s@]+)@([^\s@]+)\.([^\s@]+)$/.test(email) ||
    typeof message !== "string" ||
    message.trim().length < 20 ||
    message.length > 5000 ||
    typeof service !== "string" ||
    ![...services.map((s) => s[0]), "Something else / Let’s discuss"].includes(
      service,
    )
  )
    return NextResponse.json(
      {
        error:
          "Please provide a valid name, email, service, and project description of at least 20 characters.",
      },
      { status: 400 },
    );
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL)
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured yet. Your message has not been sent. Please return once contact details are available.",
      },
      { status: 503 },
    );
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Ark Masterpiece inquiry: ${service}`,
        text: `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok) throw new Error("Provider rejected request");
    return NextResponse.json({ sent: true });
  } catch {
    return NextResponse.json(
      { error: "Your message could not be sent. Please try again later." },
      { status: 502 },
    );
  }
}
