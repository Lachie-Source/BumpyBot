"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiPageEmbed = void 0;
const clamp_1 = require("../../functions/clamp");
class MultiPageEmbed {
    constructor(embeds) {
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
        this.page = clamp_1.clamp(this.page, 0, 5);
    }
}
exports.MultiPageEmbed = MultiPageEmbed;
