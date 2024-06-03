import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { to, subject, text } = req.body;

    // Create a transporter object
    let transporter = nodemailer.createTransport({
      host: "smtp.example.com", // Replace with your SMTP server
      port: 587, // Usually 587 for secure SMTP
      secure: false, // true for 465, false for other ports
      auth: {
        user: "your-email@example.com", // Your email
        pass: "your-email-password", // Your email password
      },
    });

    try {
      // Send mail
      let info = await transporter.sendMail({
        from: '"Your Name" <your-email@example.com>', // Sender address
        to: to, // List of recipients
        subject: subject, // Subject line
        text: text, // Plain text body
      });

      console.log("Message sent: %s", info.messageId);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email: %s", error);
      res
        .status(500)
        .json({ message: "Error sending email", error: error.toString() });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
