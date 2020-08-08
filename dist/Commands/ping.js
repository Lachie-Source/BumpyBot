"use strict";
const discord_js_1 = require("discord.js");
const bot_utils_1 = require("bot-utils");
const os_1 = require("os");
module.exports = {
    name: "ping",
    aliases: ["status"],
    permissions: [],
    execute(message, args, client) {
        var _a, _b;
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Ping!")
            .setDescription("Pinging...")
            .setAuthor((_a = message.member) === null || _a === void 0 ? void 0 : _a.displayName, message.author.avatarURL())
            .setColor(`${(_b = message.member) === null || _b === void 0 ? void 0 : _b.displayHexColor}`);
        message.channel.send(embed).then((msg) => {
            embed
                .setDescription("")
                .addField("> Client Latency", `\`${msg.createdTimestamp - message.createdTimestamp}ms\``, true)
                .addField("> API Latency", `\`${Math.round(client.ws.ping)}ms\``, true)
                .addField("> Client Uptime", `\`${bot_utils_1.uptime()}\``, true)
                .addField("> CPU Usage", `\`${os_1.loadavg()}\``, true);
            msg.edit(embed);
        });
    },
};
