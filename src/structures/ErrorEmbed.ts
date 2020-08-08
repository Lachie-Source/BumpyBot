import { MessageEmbed } from "discord.js";
export class ErrorEmbed extends MessageEmbed {
  constructor(message: string) {
    super();
    this.title = `Error! ${message}`;
    this.color = 15158332;
  }
}
