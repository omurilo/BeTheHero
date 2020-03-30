import SMTPConnection from 'nodemailer/lib/smtp-connection';

const config: SMTPConnection.Options = {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

export default config;
