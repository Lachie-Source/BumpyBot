import { MessageEmbed, EmbedField } from "discord.js";

export class SuccessEmbed extends MessageEmbed {
  constructor(
    message: string,
    color: any,
    author: any,
    description: string,
    fields: EmbedField[] = []
  ) {
    super();
    this.title = `${message}`;
    this.description = description;
    this.color = color;
    this.fields = fields;
    this.author = author;
  }
}
