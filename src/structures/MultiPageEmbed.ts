import Discord, { MessageEmbed } from "discord.js";

export class MultiPageEmbed {
  embeds: MessageEmbed[];
  page: number;
  embed: MessageEmbed;
  constructor(embeds: MessageEmbed[]) {
    this.embeds = embeds;
    this.page = 0;
    this.embed = this.embeds[this.page];
  }

  next() {
    this.page++;
    this.embed = this.embeds[this.page];
  }
  backward() {
    this.page--;
    this.embed = this.embeds[this.page];
  }
  MessageEmbed() {
    return this.embed;
  }
}
