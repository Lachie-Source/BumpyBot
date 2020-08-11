import Discord, { MessageEmbed } from "discord.js";
import { clamp } from "../../functions/clamp";

export class MultiPageEmbed {
  embeds: MessageEmbed[];
  page: number;
  embed: MessageEmbed;
  client: Discord.Client;

  constructor(embeds: MessageEmbed[], client: Discord.Client) {
    this.embeds = embeds;
    this.page = 0;
    this.embed = this.embeds[this.page];
    this.client = client;
  }

  next() {
    this.page++;
    this.clamp();
    this.embed = this.embeds[this.page];
  }
  backwards() {
    this.page--;
    this.clamp();
    this.embed = this.embeds[this.page];
  }
  MessageEmbed() {
    return this.embed;
  }

  setPage(n: number) {
    this.page = n;
    this.clamp();
    this.embed = this.embeds[this.page];
  }

  clamp() {
    this.page = clamp(
      this.page,
      0,
      this.client.commands
        .filter((cmd: any) => !cmd.permissions.includes("DEV"))
        .array().length
    );
    this.embed = this.embeds[this.page];
  }
}
