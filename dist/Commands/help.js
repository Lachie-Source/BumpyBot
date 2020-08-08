"use strict";
const discord_js_1 = require("discord.js");
const MultiPageEmbed_1 = require("../structures/MultiPageEmbed");
const titleCases_1 = require("../functions/titleCases");
module.exports = {
    name: "help",
    aliases: ["commands"],
    permissions: [],
    execute(message, args, client) {
        const embeds = new MultiPageEmbed_1.MultiPageEmbed(client.commands.map((cmd, index) => {
            var _a, _b;
            return new discord_js_1.MessageEmbed()
                .setAuthor((_a = message.member) === null || _a === void 0 ? void 0 : _a.displayName)
                .setTitle(`Help - Page ${index + 1}`)
                .setColor(`${(_b = message.member) === null || _b === void 0 ? void 0 : _b.displayHexColor}`)
                .addFields([
                {
                    name: "Command",
                    value: titleCases_1.toTitleCase(cmd),
                    inline: true,
                },
            ]);
        }));
    },
};
