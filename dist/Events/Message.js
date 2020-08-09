"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDM = exports.ClientPingedMessage = exports.CommandHandlerMessage = void 0;
const discord_js_1 = require("discord.js");
const UserErrorEmbed_1 = require("../structures/Embeds/ErrorEmbeds/UserErrorEmbed");
const CodeErrorEmbed_1 = require("../structures/Embeds/ErrorEmbeds/CodeErrorEmbed");
const InformationEmbed_1 = require("../structures/Embeds/InformationEmbed");
function CommandHandlerMessage(client, prefix = "b!") {
    client.on("message", (message) => {
        if (message.channel.type == "dm")
            return;
        // Handler
        if (!message.content.toLowerCase().startsWith(prefix))
            return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args[0].toLowerCase();
        args.shift();
        const checkcmd = client.commands.get(command) ||
            client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));
        if (!checkcmd)
            return;
        if (!message.guild?.me?.hasPermission(checkcmd.needperms)) {
            message.channel.send(new UserErrorEmbed_1.UserErrorEmbed("I Dont Have Permission To Perform This Command"));
            return;
        }
        if ((!(message.author.id == "655256461101891585") &&
            checkcmd.permissions.includes("DEV")) ||
            !message.member?.hasPermission(checkcmd.permissions.filter((x) => x != "DEV"))) {
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
        if (message.content == `<@!${client.user?.id}>`) {
            message.channel.send(new InformationEmbed_1.InformationEmbed("BumpyBot", message.member?.displayColor, [
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
function ClientDM(client) {
    client.on("message", (message) => {
        if (message.channel.type == "dm") {
            if (message.content.startsWith("b!")) {
                const args = message.content.slice(2).split(/ +/);
                const command = args[0].toLowerCase();
                args.shift();
                if (command == "respond" && args[0]) {
                    var guild = client.guilds.cache.find((x) => !!x.members.cache.get(args[0]));
                    if (!guild) {
                        message.channel.send("BUMPY U HAVE 2 BRAIN CELLS TTHATS NOT A MEMBER");
                        return;
                    }
                    var member = guild.members.cache.find((x) => x.id == args[0]);
                    if (!member) {
                        message.channel.send("BUMPY U HAVE 2 BRAIN CELLS TTHATS NOT A MEMBER");
                        return;
                    }
                    args.shift();
                    const embed = new discord_js_1.MessageEmbed()
                        .setAuthor(`${message.author?.username} | ${message.author.id}`, `${message.author.avatarURL()}`)
                        .setColor(`${message.member?.displayHexColor}`)
                        .setDescription(args.join(" "));
                    member?.user.send(embed);
                }
                return;
            }
            if (message.author.bot)
                return;
            const embed = new discord_js_1.MessageEmbed()
                .setAuthor(`${message.author?.username} | ${message.author.id}`, `${message.author.avatarURL()}`)
                .setColor(`${message.member?.displayHexColor}`)
                .setDescription(message.content);
            client.guilds.cache
                .get("735552284712239215")
                ?.members.cache.get("655256461101891585")
                ?.user.send(embed);
        }
        // Check for dev responce
    });
}
exports.ClientDM = ClientDM;
