import { MessageEmbed } from "discord.js";
export class UserErrorEmbed extends MessageEmbed {
  constructor(message: string) {
    super();

    this.title = `Error! ${message}`;
    this.color = 15158332;
  }
}
