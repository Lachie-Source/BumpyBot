"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const InformationEmbed_1 = require("../structures/Embeds/InformationEmbed");
const node_fetch_1 = __importDefault(require("node-fetch"));
const UserErrorEmbed_1 = require("../structures/Embeds/ErrorEmbeds/UserErrorEmbed");
const SuccessEmbed_1 = require("../structures/Embeds/SuccessEmbed");
const CodeErrorEmbed_1 = require("../structures/Embeds/ErrorEmbeds/CodeErrorEmbed");
module.exports = {
    name: "config",
    aliases: ["settings", "configuration"],
    permissions: ["MANAGE_SERVER"],
    description: "Configure BumpyBot Just How You Like It",
    type: "Utility",
    needperms: ["SEND_MESSAGES", "EMBED_LINKS"],
    usage: '(prefix)config <Prefix> [Value="b!"]',
    async execute(message, args, client, database) {
        const prefix = (await node_fetch_1.default(`https://bumpybot-discord.firebaseio.com/guilds/${message.guild.id}/config/prefix.json`).then((req) => req.json())) || "b!";
        if (!args[0]) {
            message.channel.send(new InformationEmbed_1.InformationEmbed("Config", `${message.member.displayHexColor}`, {
                user: message.member.displayName,
                url: message.author.avatarURL(),
            }, [
                {
                    name: "Prefix",
                    value: prefix,
                    inline: false,
                },
            ]));
        }
        if (args[0]) {
            var embed;
            if (args[0] == "prefix") {
                if (args[1]) {
                    try {
                        database
                            .ref(`guilds/${message.guild.id}/config/prefix`)
                            .set(args[1]);
                        embed = new SuccessEmbed_1.SuccessEmbed("Config", `${message.member.displayHexColor}`, {
                            user: message.member.displayName,
                            url: message.author.avatarURL(),
                        }, `Successfully Set The Prefix To "${args[1]}"`);
                    }
                    catch (e) {
                        message.channel.send(new CodeErrorEmbed_1.CodeErrorEmbed(e));
                        return;
                    }
                }
                else {
                    try {
                        database.ref(`guilds/${message.guild.id}/config/prefix`).set("b!");
                        embed = new SuccessEmbed_1.SuccessEmbed("Config", `${message.member.displayHexColor}`, {
                            user: message.member.displayName,
                            url: message.author.avatarURL(),
                        }, 'Successfully Set The Prefix To "b!"');
                    }
                    catch (e) {
                        message.channel.send(new CodeErrorEmbed_1.CodeErrorEmbed(e));
                        return;
                    }
                }
            }
            else {
                embed = new UserErrorEmbed_1.UserErrorEmbed(`Unknown Config Setting "${args[0]}". Please Provide A Valid Config Setting.`);
            }
            message.channel.send(embed);
        }
    },
};
