import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const events = data.events?.join(", ") || "None";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "kbharadwaj415@gmail.com",
      subject: "New Wedding RSVP",
      html: `
        <h2>New RSVP Received</h2>

        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Guests:</b> ${data.guests}</p>
        <p><b>Events:</b> ${events}</p>
        <p><b>Dietary:</b> ${data.dietary}</p>
        <p><b>Message:</b> ${data.message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });

  } catch (error) {
    console.error("RSVP Error:", error);

    return Response.json(
      { success: false, error: "Failed to send RSVP email" },
      { status: 500 }
    );
  }
}
