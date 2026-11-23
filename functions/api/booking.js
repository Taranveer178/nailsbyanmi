export async function onRequestPost(context) {
  const headers = { "Content-Type": "application/json" };

  if (!context.env.RESEND_API_KEY) {
    return Response.json(
      { ok: false, message: "Email service is not configured." },
      { status: 500, headers },
    );
  }

  let booking;
  try {
    booking = await context.request.json();
  } catch {
    return Response.json(
      { ok: false, message: "Invalid booking request." },
      { status: 400, headers },
    );
  }

  const name = String(booking?.name || "").trim();
  const phone = String(booking?.phone || "").trim();
  const email = String(booking?.email || "").trim();
  const date = String(booking?.date || "Not specified").trim();
  const service = String(booking?.service || "").trim();
  const category = String(booking?.category || "Not specified").trim();
  const notes = String(booking?.notes || "None").trim();

  if (!name || !phone || !email || !service) {
    return Response.json(
      { ok: false, message: "Please complete all required fields." },
      { status: 400, headers },
    );
  }

  const escapeHtml = (value) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const safe = {
    name: escapeHtml(name),
    phone: escapeHtml(phone),
    email: escapeHtml(email),
    date: escapeHtml(date),
    service: escapeHtml(service),
    category: escapeHtml(category),
    notes: escapeHtml(notes),
  };

  let resendResponse;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Glam by Anmi <onboarding@resend.dev>",
        to: ["staranveer178@gmail.com"],
        reply_to: email,
        subject: `New appointment request — ${name} — ${service}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#2F2C29;max-width:600px">
            <h2 style="margin-bottom:20px">New appointment request</h2>
            <p><strong>Name:</strong> ${safe.name}</p>
            <p><strong>Phone / WhatsApp:</strong> ${safe.phone}</p>
            <p><strong>Email:</strong> ${safe.email}</p>
            <p><strong>Preferred date:</strong> ${safe.date}</p>
            <p><strong>Service:</strong> ${safe.service}</p>
            <p><strong>Studio session:</strong> ${safe.category}</p>
            <p><strong>Notes:</strong><br>${safe.notes.replaceAll("\n", "<br>")}</p>
          </div>
        `,
        text: `New appointment request\n\nName: ${name}\nPhone / WhatsApp: ${phone}\nEmail: ${email}\nPreferred date: ${date}\nService: ${service}\nStudio session: ${category}\nNotes: ${notes}\n`,
      }),
    });
  } catch (error) {
    console.error("Could not reach Resend for the booking email.", error);
    return Response.json(
      {
        ok: false,
        message:
          "We could not reach the email service. Please try again or call the studio.",
      },
      { status: 502, headers },
    );
  }

  if (!resendResponse.ok) {
    console.error(
      "Resend booking email failed.",
      resendResponse.status,
      await resendResponse.text(),
    );
    return Response.json(
      {
        ok: false,
        message:
          "We could not send the request. Please try again or call the studio.",
      },
      { status: 502, headers },
    );
  }

  return Response.json(
    { ok: true, message: "Appointment request sent." },
    { status: 200, headers },
  );
}
