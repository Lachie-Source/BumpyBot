"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const UserErrorEmbed_1 = require("../structures/Embeds/ErrorEmbeds/UserErrorEmbed");
const CodeErrorEmbed_1 = require("../structures/Embeds/ErrorEmbeds/CodeErrorEmbed");
const util_1 = require("util");
const hastebin_1 = __importDefault(require("hastebin"));
module.exports = {
    name: "eval",
    aliases: ["inspect", "code"],
    permissions: ["DEV"],
    async execute(message, args, client) {
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Eval")
            .setAuthor(message.author.username, `${message.author.avatarURL()}`)
            .setDescription("Loading...")
            .setColor(`${message.member?.displayHexColor}`);
        try {
            message.channel.send(embed).then(async (m) => {
                if (!args[0]) {
                    m.edit(new UserErrorEmbed_1.UserErrorEmbed("Please Supply Valid JavaScript"));
                    return;
                }
                args = args.join(" ");
                embed.setDescription("Evaluating");
                m.edit(embed);
                try {
                    const code = await eval(args);
                    const inspected = await util_1.inspect(code);
                    if (inspected.toString().length < 1900 - args.length) {
                        embed
                            .setDescription(`\`\`\`ts\n${args}\n\`\`\`\n\n\`\`\`ts\n${inspected}\n\`\`\``)
                            .setColor(`${message.member?.displayHexColor}`);
                        m.edit(embed);
                    }
                    else {
                        // Hastebin Stuff
                        var haste = await hastebin_1.default.createPaste(inspected, {
                            server: "https://hastebin.com",
                        });
                        embed
                            .setDescription(`\`\`\`ts\n${args}\`\`\`\n\n${haste}`)
                            .setColor(`${message.member?.displayHexColor}`);
                        m.edit(embed);
                    }
                }
                catch (err) {
                    m.edit(new CodeErrorEmbed_1.CodeErrorEmbed(err));
                }
            });
        }
        catch (err) {
            message.channel.send(new CodeErrorEmbed_1.CodeErrorEmbed(err));
        }
    },
};
//# sourceMappingURL=eval.js.map