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
  password: string;
}

export interface IPasswordDecryptDTO {
  password: string;
  passwordHash: string;
}

export interface IPasswordService {
  encryptPassword(request: IPasswordEncryptDTO): Promise<string>;
  checkPassword(request: IPasswordDecryptDTO): Promise<boolean>;
  generateToken(request: IGenerateTokenDTO): Promise<string>;
}

export interface IOngPassordDTO extends IOngDTO {
  password: string;
}

export interface IGenerateTokenDTO {
  id: string;
  email: string;
}

export interface ICountDTO {
  count: { count: Number };
}
