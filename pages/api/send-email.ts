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
      host: "smtp.gmail.com", // Replace with your SMTP server
      port: 465, // Usually 587 for secure SMTP
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    try {
      // Send mail
      let info = await transporter.sendMail({
        from: '"Ultium CAM" <ultium.cam2024@gmail.com>', // Sender address
        to: "", // List of recipients
        subject: "[NO REPLY] Visitor Information for the Company", // Subject line
        text: "Dear visitor,\n\nI hope this message finds you well.\n\nWe are pleased to inform you that your visit to Ultium CAM has been approved. Kindly ensure that you adhere to the guidelines and regulations agreed upon during your visit.\n\nShould you have any questions or require further assistance, please do not hesitate to reach out.\n\nWe look forward to welcoming you.\n\nBest regards,\nUltium CAM", // Plain text body
      });

      console.log("Message sent: %s", info.messageId);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email: %s", error);
      res.status(500).json({ message: "Error sending email", error: error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
