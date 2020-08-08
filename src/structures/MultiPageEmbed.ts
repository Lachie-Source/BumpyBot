import Discord, { MessageEmbed } from "discord.js";
import { clamp } from "../functions/clamp";

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
    this.clamp();
  }
  backwards() {
    this.page--;
    this.embed = this.embeds[this.page];
    this.clamp();
  }
  MessageEmbed() {
    return this.embed;
  }
  clamp() {
    this.page = clamp(this.page, 0, 5);
  }
}
