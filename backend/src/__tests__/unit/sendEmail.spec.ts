import 'dotenv/config';
import EmailService from 'services/EmailService';

// import nodemailer from 'nodemailer';

// const sendMailMock = jest.fn();
// const useMock = jest.fn();

// jest.mock('nodemailer');

// (nodemailer.createTransport as jest.Mock).mockReturnValue({
//   sendMail: sendMailMock,
// });
// (nodemailer.createTransport as jest.Mock).mockReturnValue({
//   use: useMock,
// });

// beforeEach(() => {
//   sendMailMock.mockClear();
//   useMock.mockClear();
//   (nodemailer.createTransport as jest.Mock).mockClear();
// });

describe('Send e-mail', () => {
  it('should be sending email', async () => {
    const Mail = new EmailService();

    const { name, email } = {
      name: 'Murilo Henrique',
      email: 'oofleaoo@gmail.com',
    };

    const sendmail: Promise<any> = await Mail.sendMail({
      from: {
        name: 'Be The Hero',
        email: 'contact@bethehero.com',
      },
      to: {
        name,
        email,
      },
      message: {
        subject: 'Bem vindo ao Be The Hero',
        template: 'createAccount',
        context: { name },
      },
    });

    expect(sendmail).toBeDefined();
    expect(sendmail).toMatchObject({ rejected: [], accepted: [email] });
  });
});
