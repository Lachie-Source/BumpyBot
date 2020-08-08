declare module "BumpyBot" {
  export class ErrorEmbed extends MessageEmbed {
    constructor(message: string) {}
    public message: string;
  }
}
