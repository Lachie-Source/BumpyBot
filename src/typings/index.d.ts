declare module "BumpyBot" {
  export class ErrorEmbed extends MessageEmbed {
    constructor(message: string) {}
    public message: string;
  }
  export class CodeError extends MessageEmbed {
    constructor(message: string) {}
    public err: string;
  }
}
