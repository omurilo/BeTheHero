import path from 'path';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import mailConfig from 'config/mail';

import {
  IMessageDTO,
  IEmailService,
  IMailOptions,
  MailOptions,
} from 'interfaces';

class EmailService implements IEmailService {
  sendMail({ from, to, message }: IMessageDTO) {
    const viewPath = path.resolve(__dirname, '..', 'views', 'emails');

    const transporter = nodemailer.createTransport(mailConfig);

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

    const sendHtmlMail: MailOptions<IMailOptions> = (mailOptions) =>
      transporter.sendMail(mailOptions);

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
