"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformationEmbed = void 0;
const discord_js_1 = require("discord.js");
class InformationEmbed extends discord_js_1.MessageEmbed {
    constructor(message, color, author, fields = []) {
        super();
        this.title = `${message}`;
        this.color = color;
        this.fields = fields;
        this.author = author;
    }
}
exports.InformationEmbed = InformationEmbed;
