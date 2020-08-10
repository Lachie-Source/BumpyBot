import { MessageEmbed, EmbedField } from "discord.js";
export class FieldedEmbed extends MessageEmbed {
  constructor(color: any, fields: EmbedField[] = [], author: any) {
    super();
    this.color = color;
    this.fields = fields;
    this.author = author;
  }
}
