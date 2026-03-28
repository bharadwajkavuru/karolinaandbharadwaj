import nodemailer from "nodemailer";

export async function POST(req: Request) {

  try {

    const data = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const events = data.events?.join(", ") || "None";
    const attendance = data.attendance || "Not specified";

    // ✨ Dynamic message based on response
    const messageMap: any = {
      Yes: "We are truly delighted that you will be joining us. It means so much to celebrate together.",
      No: "We completely understand and will miss your presence. Thank you for your warm wishes.",
      Maybe: "We hope you’ll be able to join us. Do let us know once your plans are confirmed."
    };

    const customMessage = messageMap[data.attendance] || "";

    // 📩 EMAIL TO YOU
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "kbharadwaj415@gmail.com",
      subject: "New Wedding RSVP",
      html: `
        <h2>New RSVP</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Response:</b> ${attendance}</p>
        <p><b>Guests:</b> ${data.guests}</p>
        <p><b>Events:</b> ${events}</p>
        <p><b>Dietary:</b> ${data.dietary || "-"}</p>
        <p><b>Message:</b> ${data.message || "-"}</p>
      `
    });

    // 💌 EMAIL TO GUEST (INVITATION STYLE)
    await transporter.sendMail({
      from: `"Karolína & Bharadwaj" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "✨ We can’t wait to celebrate with you",

      html: `
      <div style="font-family: 'Georgia', serif; background:#0f0d0b; padding:40px; color:#f5f5f5;">
        
        <div style="max-width:600px; margin:auto; background:#1a1714; padding:40px; border-radius:12px; border:1px solid rgba(212,175,55,0.3); text-align:center;">
          
          <h1 style="color:#d4af37; letter-spacing:2px; margin-bottom:10px;">
            Karolína & Bharadwaj
          </h1>

          <p style="color:#e6c77c; margin-bottom:30px;">
            Two Cultures • One Celebration
          </p>

          <h2 style="color:#f1d48a;">Thank You ✦</h2>

          <p style="margin-top:20px;">
            Dear ${data.name},
          </p>

          <p style="margin-top:10px; line-height:1.6;">
            ${customMessage}
          </p>

          <div style="margin:30px 0; padding:20px; background:#0f0d0b; border-radius:10px; border:1px solid rgba(212,175,55,0.2); text-align:left;">
            
            <p><b>Response:</b> ${attendance}</p>
            <p><b>Name:</b> ${data.name}</p>
            <p><b>Email:</b> ${data.email}</p>
            <p><b>Guests:</b> ${data.guests || "-"}</p>
            <p><b>Events:</b> ${events}</p>
            <p><b>Dietary:</b> ${data.dietary || "-"}</p>
            <p><b>Message:</b> ${data.message || "-"}</p>

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
      `
    });

    // 📊 GOOGLE SHEETS
    await fetch("https://script.google.com/macros/s/AKfycbxzVYssEIRHpBNntx77BZ9Cp2Fv6RBTXVxifcj5NhUebTsw7wzanEgc18UZr0OXB-4pjA/exec", {
      method: "POST",
      body: JSON.stringify(data)
    });

    return Response.json({ success: true });

  } catch (error) {

    console.error(error);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}

