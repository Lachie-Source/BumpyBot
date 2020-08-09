"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPingedMessage = exports.CommandHandlerMessage = void 0;
const UserErrorEmbed_1 = require("../structures/Embeds/ErrorEmbeds/UserErrorEmbed");
const CodeErrorEmbed_1 = require("../structures/Embeds/ErrorEmbeds/CodeErrorEmbed");
const InformationEmbed_1 = require("../structures/Embeds/InformationEmbed");
function CommandHandlerMessage(client, prefix = "b!") {
    client.on("message", (message) => {
        var _a;
        if (!message.content.toLowerCase().startsWith(prefix))
            return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args[0].toLowerCase();
        args.shift();
        const checkcmd = client.commands.get(command) ||
            client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));
        if (!checkcmd)
            return;
        if ((!(message.author.id == "655256461101891585") &&
            checkcmd.permissions.includes("DEV")) ||
            !((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission(checkcmd.permissions.filter((x) => x != "DEV")))) {
            message.channel.send(new UserErrorEmbed_1.UserErrorEmbed("You Dont Have Permission To Perform This Command"));
            return;
        }
        try {
            checkcmd.execute(message, args, client);
        }
        catch (e) {
            message.channel.send(new CodeErrorEmbed_1.CodeErrorEmbed(e));
        }
    });
}
exports.CommandHandlerMessage = CommandHandlerMessage;
function ClientPingedMessage(client) {
    client.on("message", (message) => {
        var _a, _b;
        if (message.content == `<@!${(_a = client.user) === null || _a === void 0 ? void 0 : _a.id}>`) {
            message.channel.send(new InformationEmbed_1.InformationEmbed("BumpyBot", (_b = message.member) === null || _b === void 0 ? void 0 : _b.displayColor, [
                {
                    name: "> Prefix",
                    value: "b!",
                    inline: true,
                },
                {
                    name: "> All Commands",
                    value: "b!help",
                    inline: true,
                },
                {
                    name: "> Additional Information",
                    value: "b!info",
                    inline: true,
                },
            ]));
        }
    });
}
exports.ClientPingedMessage = ClientPingedMessage;
