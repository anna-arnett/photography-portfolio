import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const SERVICES: Record<string, string> = {
  senior: "Senior / Graduation Portraits",
  portrait: "Portraits",
  headshot: "Headshots",
  creative: "Creative Shoot",
  couples: "Couples",
  event: "Event",
  other: "Something Else",
};

const MAX_BODY_SIZE = 16_384;

function getText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");

    // Reject cross-origin browser submissions.
    if (origin && origin !== new URL(request.url).origin) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 }
      );
    }

    if (
      !request.headers
        .get("content-type")
        ?.includes("application/json")
    ) {
      return NextResponse.json(
        { error: "Invalid request format." },
        { status: 415 }
      );
    }

    const rawBody = await request.text();

    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: "Your submission is too long." },
        { status: 413 }
      );
    }

    let body;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Invalid submission." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid submission." },
        { status: 400 }
      );
    }

    const name = getText(body.name);
    const email = getText(body.email);
    const service = getText(body.service);
    const date = getText(body.date);
    const location = getText(body.location);
    const message = getText(body.message);
    const budget = getText(body.budget);

    // Honeypot: humans should never fill this field.
    const website = getText(body.website);

    if (website) {
      return NextResponse.json({ success: true });
    }

    // Required fields.
    if (!name || !email || !service) {
      return NextResponse.json(
        {
          error: "Please provide your name, email, and session type.",
        },
        { status: 400 }
      );
    }

    // Validate email format.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Validate session type.
    if (!Object.hasOwn(SERVICES, service)) {
      return NextResponse.json(
        { error: "Please select a valid session type." },
        { status: 400 }
      );
    }

    // Limit input lengths.
    if (
      name.length > 100 ||
      email.length > 254 ||
      date.length > 150 ||
      location.length > 200 ||
      message.length > 3000 ||
      budget.length > 150
    ) {
      return NextResponse.json(
        {
          error: "One or more fields exceed the maximum length.",
        },
        { status: 400 }
      );
    }

    // Prevent line breaks in email headers.
    if (/[\r\n]/.test(name) || /[\r\n]/.test(email)) {
      return NextResponse.json(
        { error: "Invalid name or email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.INQUIRY_TO_EMAIL;
    const fromEmail = process.env.INQUIRY_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error("Inquiry email configuration is missing.");

      return NextResponse.json(
        {
          error: "The inquiry service is temporarily unavailable.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,

      subject: `New Photography Inquiry: ${SERVICES[service]} — ${name}`,

      text: [
        "NEW PHOTOGRAPHY INQUIRY",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Session: ${SERVICES[service]}`,
        `Preferred date: ${date || "Not specified"}`,
        `Location: ${location || "Not specified"}`,
        `Budget: ${budget || "Not specified"}`,
        "",
        "SESSION IDEA",
        "",
        message || "Not specified",
        "",
        "Reply directly to this email to contact the client.",
      ].join("\n"),
    });

    if (error || !data?.id) {
      console.error("Inquiry email delivery request failed.");

      return NextResponse.json(
        {
          error: "Your inquiry could not be sent. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error("Unexpected inquiry submission error.");

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}