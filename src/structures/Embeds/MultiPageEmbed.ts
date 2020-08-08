import Discord, { MessageEmbed } from "discord.js";
import { clamp } from "../../functions/clamp";

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
  clamp() {
    this.page = clamp(this.page, 0, 5);
    this.embed = this.embeds[this.page];
  }
  setPage(n: number) {
    this.page = clamp(n, 0, 5);
    this.embed = this.embeds[this.page];
  }
}
