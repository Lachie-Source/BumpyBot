"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const os_1 = __importDefault(require("os"));
const os_name_1 = __importDefault(require("os-name"));
const pretty_ms_1 = __importDefault(require("pretty-ms"));
module.exports = {
    name: "ping",
    aliases: ["status"],
    permissions: [],
    description: "Get The Client's Uptime And Latency",
    type: "Utility",
    needperms: ["SEND_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS"],
    execute(message, args, client) {
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Ping!")
            .setDescription("Pinging...")
            .setAuthor(message.member?.displayName, `${message.author.avatarURL()}`)
            .setColor(`${message.member?.displayHexColor}`);
        message.channel.send(embed).then((msg) => {
            embed
                .setDescription("")
                .addField("> Client Latency", `\`${msg.createdTimestamp - message.createdTimestamp}ms\``, true)
                .addField("> API Latency", `\`${Math.round(client.ws.ping)}ms\``, true)
                .addField("> Client Uptime", `\`${pretty_ms_1.default(client.uptime ? client.uptime : 0)}\``, true)
                .addField("> OS Info", `\`\`\`yaml\nOS Name: ${os_name_1.default(os_1.default.platform(), os_1.default.release())}\nCPU Architecture: ${os_1.default.arch()}\nCPU: Intel(R) Core(TM) i5-8265U CPU @ 1.60GHz (x8)\n\`\`\``);
            msg.edit(embed);
        });
    },
};
