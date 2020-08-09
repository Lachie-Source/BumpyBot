"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const discord_js_1 = require("discord.js");
const MultiPageEmbed_1 = require("../structures/Embeds/MultiPageEmbed");
const titleCases_1 = require("../functions/titleCases");
const UserErrorEmbed_1 = require("../structures/Embeds/ErrorEmbeds/UserErrorEmbed");
module.exports = {
    name: "help",
    aliases: ["commands"],
    permissions: [],
    description: "Displays All The Commands",
    type: "Utility",
    execute(message, args, client) {
        var _a, _b;
        var index = -1;
        const glossaryEmbed = new discord_js_1.MessageEmbed()
            .setAuthor((_a = message.member) === null || _a === void 0 ? void 0 : _a.displayName, `${message.author.avatarURL()}`)
            .setColor(`${(_b = message.member) === null || _b === void 0 ? void 0 : _b.displayHexColor}`)
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
                var _a, _b;
                index++;
                return new discord_js_1.MessageEmbed()
                    .setAuthor((_a = message.member) === null || _a === void 0 ? void 0 : _a.displayName, `${message.author.avatarURL()}`)
                    .setFooter('React With "⏩" To Turn A Page, React With "⏪" To Go Back A Page')
                    .setTitle(`Help - Page ${index + 1}/${client.commands
                    .array()
                    .filter((x) => !x.permissions.includes("DEV")).length}`)
                    .setColor(`${(_b = message.member) === null || _b === void 0 ? void 0 : _b.displayHexColor}`)
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
                        name: "> Required Permissions",
                        value: cmd.permissions.toString().length != 0
                            ? cmd.permissions.join(", ")
                            : "None",
                    },
                    {
                        name: "> Description",
                        value: cmd.description,
                    },
                ]);
            }),
        ]);
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
            .then((msg) => __awaiter(this, void 0, void 0, function* () {
            yield msg.react("⏪");
            yield msg.react("⏩");
            const forwardFilter = (reaction, user) => reaction.emoji.name === "⏩" && user.id === message.author.id;
            const backwardsFilter = (reaction, user) => reaction.emoji.name === "⏪" && user.id === message.author.id;
            const forward = msg.createReactionCollector(forwardFilter, {
                time: 300000,
            });
            const backwards = msg.createReactionCollector(backwardsFilter, {
                time: 300000,
            });
            forward.on("collect", (r) => __awaiter(this, void 0, void 0, function* () {
                embeds.next();
                msg.edit(embeds.MessageEmbed());
                const userReactions = msg.reactions.cache.filter((reaction) => reaction.users.cache.has(message.author.id));
                try {
                    for (const reaction of userReactions.values()) {
                        yield reaction.users.remove(message.author.id);
                    }
                }
                catch (error) {
                    console.error("Failed to remove reactions.");
                }
            }));
            backwards.on("collect", (r) => __awaiter(this, void 0, void 0, function* () {
                embeds.backwards();
                msg.edit(embeds.MessageEmbed());
                const userReactions = msg.reactions.cache.filter((reaction) => reaction.users.cache.has(message.author.id));
                try {
                    for (const reaction of userReactions.values()) {
                        yield reaction.users.remove(message.author.id);
                    }
                }
                catch (error) {
                    console.error("Failed to remove reactions.");
                }
            }));
        }));
    },
};
