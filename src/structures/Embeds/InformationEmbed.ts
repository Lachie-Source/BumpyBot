import { MessageEmbed, EmbedField } from "discord.js";
import { textChangeRangeIsUnchanged } from "typescript";
export class InformationEmbed extends MessageEmbed {
  constructor(
    message: string,
    color: any,
    fields: EmbedField[] = [],
    author: any
  ) {
    super();
    this.title = `${message}`;
    this.color = color;
    this.fields = fields;
    this.author = author;
  }
}
