import { MessageEmbed, EmbedField } from "discord.js";
export class FieldedEmbed extends MessageEmbed {
  constructor(color: any, fields: EmbedField[] = []) {
    super();
    this.color = color;
    this.fields = fields;
  }
}
