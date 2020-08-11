"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiPageEmbed = void 0;
const clamp_1 = require("../../functions/clamp");
class MultiPageEmbed {
    constructor(embeds, client) {
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
    setPage(n) {
        this.page = n;
        this.clamp();
        this.embed = this.embeds[this.page];
    }
    clamp() {
        this.page = clamp_1.clamp(this.page, 0, this.client.commands
            .filter((cmd) => !cmd.permissions.includes("DEV"))
            .array().length);
        this.embed = this.embeds[this.page];
    }
}
exports.MultiPageEmbed = MultiPageEmbed;
