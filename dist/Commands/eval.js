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
    aliases: ["inspect", "e", "i"],
    permissions: ["DEV"],
    execute(message, args, client) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.MessageEmbed()
                .setTitle("Eval")
                .setAuthor(message.author.username, `${message.author.avatarURL()}`)
                .setDescription("Loading...")
                .setColor(`${(_a = message.member) === null || _a === void 0 ? void 0 : _a.displayHexColor}`);
            try {
                message.channel.send(embed).then((m) => __awaiter(this, void 0, void 0, function* () {
                    var _b, _c;
                    if (!args[0]) {
                        m.edit(new UserErrorEmbed_1.UserErrorEmbed("Please Supply Valid JavaScript"));
                        return;
                    }
                    args = args.join(" ");
                    embed.setDescription("Evaluating");
                    m.edit(embed);
                    try {
                        const code = yield eval(args);
                        const inspected = yield util_1.inspect(code);
                        if (inspected.toString().length < 1900 - args.length) {
                            embed
                                .setDescription(`\`\`\`ts\n${args}\n\`\`\`\n\n\`\`\`ts\n${inspected}\n\`\`\``)
                                .setColor(`${(_b = message.member) === null || _b === void 0 ? void 0 : _b.displayHexColor}`);
                            m.edit(embed);
                        }
                        else {
                            // Hastebin Stuff
                            var haste = yield hastebin_1.default.createPaste(inspected, {
                                server: "https://hastebin.com",
                            });
                            embed
                                .setDescription(`\`\`\`ts\n${args}\`\`\`\n\n${haste}`)
                                .setColor(`${(_c = message.member) === null || _c === void 0 ? void 0 : _c.displayHexColor}`);
                            m.edit(embed);
                        }
                    }
                    catch (err) {
                        m.edit(new CodeErrorEmbed_1.CodeErrorEmbed(err));
                    }
                }));
            }
            catch (err) {
                message.channel.send(new CodeErrorEmbed_1.CodeErrorEmbed(err));
            }
        });
    },
};
