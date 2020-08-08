"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiPageEmbed = void 0;
class MultiPageEmbed {
    constructor(embeds) {
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
exports.MultiPageEmbed = MultiPageEmbed;
