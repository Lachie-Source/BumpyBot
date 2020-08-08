import { MessageEmbed, EmbedField } from "discord.js";
export class InformationEmbed extends MessageEmbed {
  constructor(message: string, color: any, fields: EmbedField[] = []) {
    super();
    this.title = `${message}`;
    this.color = color;
    this.fields = fields;
  }
}
