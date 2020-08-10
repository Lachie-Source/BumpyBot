"use strict";
const InformationEmbed_1 = require("../structures/Embeds/InformationEmbed");
module.exports = {
    name: "information",
    aliases: ["info"],
    permissions: [],
    description: "All The Information For BumpyBot",
    type: "Utility",
    needperms: ["SEND_MESSAGES", "EMBED_LINKS"],
    usage: "(Prefix)info",
    execute(message, args, client) {
        const embed = new InformationEmbed_1.InformationEmbed("Information", `${message.member?.displayHexColor}`, {
            user: message.member.displayName,
            url: message.author.avatarURL(),
        }, [
            {
                name: "> How Can I Support BumpyBot?",
                value: `\`You Can Support BumpyBot By "Starring" BumpyBot's Github Repository, Or You Can Contribute To The Repository.\``,
                inline: false,
            },
            {
                name: "> Why BumpyBot?",
                inline: false,
                value: `\`BumpyBot Focuses On Ease Of Development, Rather Than Ease Of Use. This Way Our Development Workflow Is Efficent And Simple, So BumpyBot Can Continue To Update Frequently.\``,
            },
            {
                name: "> How Can I Add BumpyBot To My Server?",
                value: `[Click Here!](https://discord.com/oauth2/authorize?client_id=741157412060528701&scope=bot&permissions=1543892215)`,
                inline: false,
            },
            {
                name: "> Yeh, I Can Help; But Where?",
                value: `[Click Here!](https://github.com/Lachie-Source/BumpyBot)`,
                inline: false,
            },
            {
                name: "> Got Any Other Questions?",
                value: "`Message Me To Start A Support Session`",
                inline: false,
            },
        ]);
        message.channel.send(embed);
    },
};
