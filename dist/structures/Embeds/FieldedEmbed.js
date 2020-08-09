"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldedEmbed = void 0;
const discord_js_1 = require("discord.js");
class FieldedEmbed extends discord_js_1.MessageEmbed {
    constructor(color, fields = []) {
        super();
        this.color = color;
        this.fields = fields;
    }
}
exports.FieldedEmbed = FieldedEmbed;
