import nodemailer from "nodemailer";

// you can source these from process.env
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,  
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // upgrade with STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendReportEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  await transporter.sendMail({
    from: `"CliniTech Hospital" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html,
  });
};
