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
module.exports = {
    name: "invite",
    aliases: [],
    permissions: ["CREATE_INSTANT_INVITE", "SEND_MESSAGES", "EMBED_LINKS"],
    description: "Create An Invite For The Server And The Bot",
    type: "Utility",
    execute(message, args, client) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            var invite = yield ((_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.systemChannel) === null || _b === void 0 ? void 0 : _b.createInvite());
            const embed = new discord_js_1.MessageEmbed()
                .setTitle("Invite Links")
                .setColor(`${(_c = message.member) === null || _c === void 0 ? void 0 : _c.displayHexColor}`)
                .setAuthor((_d = message.member) === null || _d === void 0 ? void 0 : _d.displayName, `${message.author.avatarURL()}`)
                .addFields([
                {
                    name: "> Server Invite",
                    value: `[Click Here](${invite})`,
                    inline: true,
                },
                {
                    name: "> Bot Invite",
                    value: "[Click Here](https://discord.com/oauth2/authorize?client_id=741157412060528701&scope=bot&permissions=1543892215)",
                    inline: true,
                },
            ]);
            message.channel.send(embed);
        });
    },
};
