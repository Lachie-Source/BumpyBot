"use strict";
const discord_js_1 = require("discord.js");
const MultiPageEmbed_1 = require("../structures/Embeds/MultiPageEmbed");
const titleCases_1 = require("../functions/titleCases");
const UserErrorEmbed_1 = require("../structures/Embeds/ErrorEmbeds/UserErrorEmbed");
module.exports = {
    name: "help",
    aliases: ["commands"],
    permissions: ["ADD_REACTIONS"],
    description: "Displays All The Commands",
    type: "Utility",
    needperms: [
        "SEND_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ADD_REACTIONS",
    ],
    usage: `(Prefix)help [Command Name]`,
    execute(message, args, client) {
        var index = -1;
        const glossaryEmbed = new discord_js_1.MessageEmbed()
            .setAuthor(message.member?.displayName, `${message.author.avatarURL()}`)
            .setColor(`${message.member?.displayHexColor}`)
            .setFooter('React With "⏩" To Turn A Page, React With "⏪" To Go Back A Page')
            .setTitle("Help - Glossary");
        client.commands
            .filter((cmd) => !cmd.permissions.includes("DEV"))
            .forEach((cmd) => {
            glossaryEmbed.addField(`> ${titleCases_1.toTitleCase(cmd.name)}`, `\`${cmd.description}\``, false);
        });
        const embeds = new MultiPageEmbed_1.MultiPageEmbed([
            glossaryEmbed,
            ...client.commands
                .filter((x) => !x.permissions.includes("DEV"))
                .map((cmd) => {
                index++;
                return new discord_js_1.MessageEmbed()
                    .setAuthor(message.member?.displayName, `${message.author.avatarURL()}`)
                    .setFooter('React With "⏩" To Turn A Page, React With "⏪" To Go Back A Page')
                    .setTitle(`Help - Page ${index + 1}/${client.commands
                    .array()
                    .filter((x) => !x.permissions.includes("DEV")).length}`)
                    .setColor(`${message.member?.displayHexColor}`)
                    .addFields([
                    {
                        name: "> Command",
                        value: titleCases_1.toTitleCase(cmd.name),
                        inline: true,
                    },
                    {
                        name: "> Aliases",
                        value: cmd.aliases.toString().length != 0
                            ? cmd.aliases
                                .map((command) => titleCases_1.toTitleCase(command))
                                .join(", ")
                            : "None",
                        inline: true,
                    },
                    {
                        name: "> Type",
                        value: titleCases_1.toTitleCase(cmd.type),
                        inline: true,
                    },
                    {
                        name: "> Usage",
                        value: cmd.usage,
                        inline: true,
                    },
                    {
                        name: "> Required Permissions",
                        value: cmd.permissions.toString().length != 0
                            ? cmd.permissions.join(", ")
                            : "None",
                    },
                    {
                        name: "> Bot's Required Permissions",
                        value: cmd.needperms.toString().length != 0
                            ? cmd.needperms.join(", ")
                            : "None",
                    },
                    {
                        name: "> Description",
                        value: cmd.description,
                    },
                ]);
            }),
        ], client);
        if (args[0]) {
            const checkcmd = client.commands
                .filter((cmd) => !cmd.permissions.includes("DEV"))
                .map((cmd) => cmd.name)
                .indexOf(args[0]);
            if (checkcmd === -1) {
                message.channel.send(new UserErrorEmbed_1.UserErrorEmbed(`Unknown Command "${args[0]}"`));
                return;
            }
            embeds.setPage(checkcmd + 1);
        }
        message.channel
            .send(embeds.MessageEmbed())
            .then(async (msg) => {
            await msg.react("⏪");
            await msg.react("⏩");
            const forwardFilter = (reaction, user) => reaction.emoji.name === "⏩" && user.id === message.author.id;
            const backwardsFilter = (reaction, user) => reaction.emoji.name === "⏪" && user.id === message.author.id;
            const forward = msg.createReactionCollector(forwardFilter, {
                time: 300000,
            });
            const backwards = msg.createReactionCollector(backwardsFilter, {
                time: 300000,
            });
            forward.on("collect", async (r) => {
                embeds.next();
                msg.edit(embeds.MessageEmbed());
                const userReactions = msg.reactions.cache.filter((reaction) => reaction.users.cache.has(message.author.id));
                try {
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(message.author.id);
                    }
                }
                catch (error) {
                    console.error("Failed to remove reactions.");
                }
            });
            backwards.on("collect", async (r) => {
                embeds.backwards();
                msg.edit(embeds.MessageEmbed());
                const userReactions = msg.reactions.cache.filter((reaction) => reaction.users.cache.has(message.author.id));
                try {
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(message.author.id);
                    }
                }
                catch (error) {
                    console.error("Failed to remove reactions.");
                }
            });
        });
    },
};
