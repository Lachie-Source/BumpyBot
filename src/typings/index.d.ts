import Discord, { EmbedField } from "discord.js";
declare module "BumpyBot" {
  export class ErrorEmbed extends MessageEmbed {
    constructor(message: string) {}
    public message: string;
  }
  export class CodeErrorEmbed extends MessageEmbed {
    constructor(err: string) {}
    public err: string;
  }
  export class InformationEmbed extends MessageEmbed {
    constructor(message: string, color: any, fields: EmbedField[] = []) {}
    public message: string;
    public color: number;
    public fields: EmbedField[];
  }
  export class FieldedEmbed extends MessageEmbed {
    constructor(color: any, fields: EmbedField[] = []) {}
    public color: number;
    public fields: EmbedField[];
  }
  interface command {
    name: string;
    aliases: string[];
    permissions: string[];
    description: string;
    type: string;
    needperms: string[];
    usage: string;
    execute: Function;
  }
}
