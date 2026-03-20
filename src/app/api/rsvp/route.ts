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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "kbharadwaj415@gmail.com",
      subject: "New Wedding RSVP",
      html: `
        <h2>New RSVP</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Guests:</b> ${data.guests}</p>
        <p><b>Events:</b> ${events}</p>
        <p><b>Dietary:</b> ${data.dietary}</p>
        <p><b>Message:</b> ${data.message}</p>
      `
    });

    // OPTIONAL: Google Sheets
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
