import { SendMailOptions, SentMessageInfo } from 'nodemailer';

export interface IOngDTO {
  id: string;
  name: string;
  email: string;
  password?: string;
  whatsapp: string;
  cidade: string;
  uf: string;
}

export interface IIncidentsDTO {
  id: string;
  title: string;
  description: string;
  value: number;
  // eslint-disable-next-line camelcase
  ong_id: string;
}

export interface IPasswordEncryptDTO {
  password: string | any;
  salt?: string | number;
}

export interface IPasswordDecryptDTO {
  password: string | any;
  passwordHash: string;
}

export interface IPasswordService {
  encryptPassword(request: IPasswordEncryptDTO): Promise<string>;
  checkPassword(request: IPasswordDecryptDTO): Promise<boolean>;
}

export interface IAuthenticationService {
  generateToken(request: IGenerateTokenDTO): Promise<string>;
  verifyToken(request: String): Promise<any>;
}

export interface IOngPassordDTO extends IOngDTO {
  password: string;
}

export interface IGenerateTokenDTO {
  id: string;
  email: string;
  options?: Object;
}

export interface ICountDTO {
  count: { count: Number };
}

export interface IMailToFrom {
  name: string;
  email: string;
}

export interface IMailMessage {
  subject: string;
  body?: string;
  template?: string;
  context?: object;
  attachment?: string[];
}

export interface IMessageDTO {
  from: IMailToFrom;
  to: IMailToFrom;
  message: IMailMessage;
}

export interface IEmailService {
  sendMail(request: IMessageDTO): void;
}

export interface IMailOptions extends SendMailOptions {
  template?: string;
  context?: object;
}

export declare type MailOptions<T extends SendMailOptions = SendMailOptions> = (
  mailOptions: T
) => Promise<SentMessageInfo>;
