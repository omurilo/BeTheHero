declare module 'youch' {
  export default class Youch<Error, Request> {
    constructor(err: Error, req: Request);
    addLink(callback: Function): Object;
    toJSON(): Promise<Object>;
    toHTML(): Promise<string>;
  }
}
