"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlerMessage = void 0;
const ErrorEmbed_1 = require("../structures/ErrorEmbed");
function CommandHandlerMessage(client, prefix = "b!") {
    client.on("message", (message) => {
        var _a, _b;
        if (!message.content.toLowerCase().startsWith(prefix))
            return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args[0].toLowerCase();
        args.shift();
        const checkcmd = client.commands.get(command) ||
            client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));
        if (!checkcmd)
            return;
        console.log(!(message.author.id == "655256461101891585") &&
            checkcmd.permissions.includes("DEV"), !((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission(checkcmd.permissions.filter((x) => x != "DEV"))));
        if ((!(message.author.id == "655256461101891585") &&
            checkcmd.permissions.includes("DEV")) ||
            !((_b = message.member) === null || _b === void 0 ? void 0 : _b.hasPermission(checkcmd.permissions.filter((x) => x != "DEV")))) {
            message.channel.send(new ErrorEmbed_1.ErrorEmbed("You Dont Have Enough Permissions To Perform This Command"));
            return;
        }
        try {
            checkcmd.execute(message, args, client);
        }
        catch (e) {
            message.channel.send(new ErrorEmbed_1.ErrorEmbed(e));
        }
    });
}
exports.CommandHandlerMessage = CommandHandlerMessage;
