export default class HttpException extends Error {
  statusCode: number;
  message: string;
  error: string | undefined;
  name: string;

  constructor(
    statusCode: number,
    name: string,
    message: string,
    error?: string
  ) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.name = name;
  }
}
