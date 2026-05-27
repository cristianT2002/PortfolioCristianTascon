const nodemailer = require("nodemailer");

const requiredEnvVars = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CONTACT_TO_EMAIL",
];

function getMissingEnvVars() {
  return requiredEnvVars.filter((key) => !process.env[key]);
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendPortfolioEmail({ subject, text, html, replyTo }) {
  const missingEnv = getMissingEnvVars();
  if (missingEnv.length > 0) {
    throw new Error("Configuración SMTP incompleta en el servidor.");
  }

  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Portafolio Cristian.Dev" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo,
    subject,
    text,
    html,
  });
}

module.exports = {
  getMissingEnvVars,
  sendPortfolioEmail,
};
