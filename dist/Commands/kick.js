"use strict";
const CodeErrorEmbed_1 = require("../structures/Embeds/ErrorEmbeds/CodeErrorEmbed");
const UserErrorEmbed_1 = require("../structures/Embeds/ErrorEmbeds/UserErrorEmbed");
const SuccessEmbed_1 = require("../structures/Embeds/SuccessEmbed");
module.exports = {
    name: "kick",
    aliases: [],
    permissions: ["KICK_MEMBERS"],
    description: "Get The Client's Uptime And Latency",
    type: "Moderation",
    needperms: ["SEND_MESSAGES", "EMBED_LINKS", "KICK_MEMBERS"],
    usage: '(Prefix)kick <User ID | User Tag> [Reason="No Reason Provided"]',
    async execute(message, args, client, database) {
        if (args[0]) {
            const member = message.guild.members.cache.get(args[0]) ||
                message.mentions.users.get(args[0]);
            if (!member) {
                // Invalid Member
                new UserErrorEmbed_1.UserErrorEmbed("Please Suply A Valid User ID Or User Tag");
            }
            else {
                if (!args[1])
                    args[1] = "No Reason Provided";
                try {
                    database
                        .ref(`guilds/${message.guild.id}/moderation/${member.id}`)
                        .push({
                        reason: args[1],
                        time: message.createdAt,
                        mod: message.author.id,
                    });
                    message.guild.members.cache.get(member.id).kick();
                    message.channel.send(new SuccessEmbed_1.SuccessEmbed("Kick", `${message.member.displayHexColor}`, {
                        user: message.member.displayName,
                        url: message.author.avatarURL(),
                    }, `Successfully Kicked ${message.guild.members.cache.get(member.id).user.username}`));
                }
                catch (e) {
                    message.channel.send(new CodeErrorEmbed_1.CodeErrorEmbed(e));
                }
            }
        }
        else {
            message.channel.send(new UserErrorEmbed_1.UserErrorEmbed("Please Suply A User ID Or User Tag"));
        }
    },
};
