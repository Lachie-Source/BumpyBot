"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeErrorEmbed = void 0;
const discord_js_1 = require("discord.js");
class CodeErrorEmbed extends discord_js_1.MessageEmbed {
    constructor(err) {
        super();
        this.title = `Error!`;
        this.fields = [
            { name: "> JS", value: `\`\`\`js\n${err}\n\`\`\``, inline: false },
        ];
        this.color = 15158332;
    }
}
exports.CodeErrorEmbed = CodeErrorEmbed;
//# sourceMappingURL=CodeErrorEmbed.js.map