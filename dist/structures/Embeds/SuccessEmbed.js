"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessEmbed = void 0;
const discord_js_1 = require("discord.js");
class SuccessEmbed extends discord_js_1.MessageEmbed {
    constructor(message, color, author, description, fields = []) {
        super();
        this.title = `${message}`;
        this.description = description;
        this.color = color;
        this.fields = fields;
        this.author = author;
    }
}
exports.SuccessEmbed = SuccessEmbed;
