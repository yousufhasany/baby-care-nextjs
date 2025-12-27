import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SERVICE_USER,
    pass: process.env.EMAIL_SERVICE_PASS,
  },
});

export function sendInvoiceEmail({ to, subject, html }) {
  return transporter.sendMail({
    from: process.env.EMAIL_SERVICE_USER,
    to,
    subject,
    html,
  });
}
