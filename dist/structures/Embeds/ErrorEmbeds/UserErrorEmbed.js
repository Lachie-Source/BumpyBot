"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserErrorEmbed = void 0;
const discord_js_1 = require("discord.js");
class UserErrorEmbed extends discord_js_1.MessageEmbed {
    constructor(message) {
        super();
        this.title = `Error! ${message}`;
        this.color = 15158332;
    }
}
exports.UserErrorEmbed = UserErrorEmbed;
//# sourceMappingURL=UserErrorEmbed.js.map