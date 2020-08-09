"use strict";
const discord_js_1 = require("discord.js");
module.exports = {
    name: "information",
    aliases: ["info"],
    permissions: [],
    description: "All The Information For BumpyBot",
    type: "Utility",
    needperms: ["SEND_MESSAGES", "EMBED_LINKS"],
    execute(message, args, client) {
        var _a, _b;
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor((_a = message.member) === null || _a === void 0 ? void 0 : _a.displayName, `${message.author.avatarURL()}`)
            .setColor(`${(_b = message.member) === null || _b === void 0 ? void 0 : _b.displayHexColor}`)
            .setTitle("Information")
            .addFields([
            {
                name: "> How Can I Support BumpyBot?",
                value: `\`You Can Support BumpyBot By "Starring" BumpyBot's Github Repository, Or You Can Contribute To The Repository.\``,
            },
            {
                name: "> Why BumpyBot?",
                value: `\`BumpyBot Focuses On Ease Of Development, Rather Than Ease Of Use. This Way Our Development Workflow Is Efficent And Simple, So BumpyBot Can Continue To Update Frequently.\``,
            },
            {
                name: "> How Can I Add BumpyBot To My Server?",
                value: `[Click Here!](https://discord.com/oauth2/authorize?client_id=741157412060528701&scope=bot&permissions=1543892215)`,
            },
            {
                name: "> Yeh, I Can Help; But Where?",
                value: `[Click Here!](https://github.com/Lachie-Source/BumpyBot)`,
            },
        ]);
        message.channel.send(embed);
    },
};
