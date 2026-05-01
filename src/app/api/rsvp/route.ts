import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const payload = {
      name: data.name || "",
      email: data.email || "",
      attendance: data.attendance || "Not specified",
      guests: data.guests || "-",
      events: Array.isArray(data.events) ? data.events : [],
      dietary: data.dietary || "",
      message: data.message || "",
      submittedAt: new Date().toISOString(),
    };

    const events = payload.events.length > 0 ? payload.events.join(", ") : "None";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const messageMap: Record<string, string> = {
      Yes: "We are truly delighted that you will be joining us. It means so much to celebrate together.",
      No: "We completely understand and will miss your presence. Thank you for your warm wishes.",
    };

    const customMessage = messageMap[payload.attendance] || "";

    // 📩 EMAIL TO YOU
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "kbharadwaj415@gmail.com",
      subject: "New Wedding RSVP",
      html: `
        <h2>New RSVP</h2>
        <p><b>Name:</b> ${payload.name}</p>
        <p><b>Email:</b> ${payload.email}</p>
        <p><b>Response:</b> ${payload.attendance}</p>
        <p><b>Guests:</b> ${payload.guests}</p>
        <p><b>Events:</b> ${events}</p>
        <p><b>Dietary:</b> ${payload.dietary || "-"}</p>
        <p><b>Message:</b> ${payload.message || "-"}</p>
        <p><b>Submitted At:</b> ${payload.submittedAt}</p>
      `,
    });

    // 💌 EMAIL TO GUEST
    await transporter.sendMail({
      from: `"Karolína & Bharadwaj" <${process.env.EMAIL_USER}>`,
      to: payload.email,
      subject: "✨ We can’t wait to celebrate with you",
      html: `
      <div style="font-family: Georgia, serif; background:#0f0d0b; padding:40px; color:#f5f5f5;">
        <div style="max-width:600px; margin:auto; background:#1a1714; padding:40px; border-radius:12px; border:1px solid rgba(212,175,55,0.3); text-align:center;">
          
          <h1 style="color:#d4af37; letter-spacing:2px; margin-bottom:10px;">
            Karolína & Bharadwaj
          </h1>

          <p style="color:#e6c77c; margin-bottom:30px;">
            Two Cultures • One Celebration
          </p>

          <h2 style="color:#f1d48a;">Thank You ✦</h2>

          <p style="margin-top:20px;">
            Dear ${payload.name},
          </p>

          <p style="margin-top:10px; line-height:1.6;">
            ${customMessage}
          </p>

          <div style="margin:30px 0; padding:20px; background:#0f0d0b; border-radius:10px; border:1px solid rgba(212,175,55,0.2); text-align:left;">
            <p><b>Response:</b> ${payload.attendance}</p>
            <p><b>Name:</b> ${payload.name}</p>
            <p><b>Email:</b> ${payload.email}</p>
            <p><b>Guests:</b> ${payload.guests}</p>
            <p><b>Events:</b> ${events}</p>
            <p><b>Dietary:</b> ${payload.dietary || "-"}</p>
            <p><b>Message:</b> ${payload.message || "-"}</p>
          </div>

          <p style="margin-top:20px;">
            We look forward to celebrating together and creating beautiful memories ✨
          </p>

          <p style="margin-top:30px;">
            With love,<br/>
            <span style="color:#d4af37;">Karolína & Bharadwaj</span>
          </p>

        </div>
      </div>
      `,
    });

    // 📊 GOOGLE SHEETS
    await fetch("https://script.google.com/macros/s/AKfycbxzVYssEIRHpBNntx77BZ9Cp2Fv6RBTXVxifcj5NhUebTsw7wzanEgc18UZr0OXB-4pjA/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("RSVP route error:", error);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}
