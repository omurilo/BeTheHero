import path from 'path';
import nodemailer, { SendMailOptions, SentMessageInfo } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import mailConfig from 'config/mail';

interface IMailToFrom {
  name: string;
  email: string;
}

interface IMailMessage {
  subject: string;
  body?: string;
  template?: string;
  context?: object;
  attachment?: string[];
}

interface IMessageDTO {
  from: IMailToFrom;
  to: IMailToFrom;
  message: IMailMessage;
}

interface IEmailService {
  sendMail(request: IMessageDTO): void;
}

interface IMailOptions extends SendMailOptions {
  template?: string;
  context?: object;
}

declare type MailOptions<T extends SendMailOptions = SendMailOptions> = (
  mailOptions: T
) => Promise<SentMessageInfo>;

class EmailService implements IEmailService {
  sendMail({ from, to, message }: IMessageDTO) {
    const transporter = nodemailer.createTransport(mailConfig);

    const viewPath = path.resolve(__dirname, '..', 'views', 'emails');

    transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extName: '.hbs',
          partialsDir: path.resolve(viewPath, 'partials'),
          layoutsDir: path.resolve(viewPath, 'layouts'),
          defaultLayout: null,
        },
        viewPath,
        extName: '.hbs',
      })
    );

    const sendHtmlMail: MailOptions<IMailOptions> = transporter.sendMail.bind(
      transporter
    );

    return sendHtmlMail({
      from: `${from.name} <${from.email}>`,
      to: `${to.name} <${to.email}>`,
      subject: message.subject,
      template: message.template,
      context: message.context,
    });
  }
}

export default EmailService;
