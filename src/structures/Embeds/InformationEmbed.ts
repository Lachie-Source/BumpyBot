import { MessageEmbed, EmbedField } from "discord.js";
import { textChangeRangeIsUnchanged } from "typescript";
export class InformationEmbed extends MessageEmbed {
  constructor(
    message: string,
    color: any,
    author: any,
    fields: EmbedField[] = []
  ) {
    super();
    this.title = `${message}`;
    this.color = color;
    this.fields = fields;
    this.author = author;
  }
}
