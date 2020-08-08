"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEmbed = void 0;
const discord_js_1 = require("discord.js");
class ErrorEmbed extends discord_js_1.MessageEmbed {
    constructor(message) {
        super();
        this.title = `Error! ${message}`;
        this.color = 15158332;
    }
}
exports.ErrorEmbed = ErrorEmbed;
