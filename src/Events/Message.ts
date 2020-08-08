import Discord, { Message } from "discord.js";
import { UserErrorEmbed } from "../structures/Embeds/ErrorEmbeds/UserErrorEmbed";
import { CodeErrorEmbed } from "../structures/Embeds/ErrorEmbeds/CodeErrorEmbed";
import { InformationEmbed } from "../structures/Embeds/InformationEmbed";

export function CommandHandlerMessage(
  client: Discord.Client,
  prefix: string = "b!"
) {
  client.on("message", (message) => {
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args[0].toLowerCase();
    args.shift();

    const checkcmd =
      client.commands.get(command) ||
      client.commands.find(
        (cmd: any) => cmd.aliases && cmd.aliases.includes(command)
      );

    if (!checkcmd) return;

    if (
      (!(message.author.id == "655256461101891585") &&
        checkcmd.permissions.includes("DEV")) ||
      !message.member?.hasPermission(
        checkcmd.permissions.filter((x: string) => x != "DEV")
      )
    ) {
      message.channel.send(
        new UserErrorEmbed("You Dont Have Permission To Perform This Command")
      );
      return;
    }

    try {
      checkcmd.execute(message, args, client);
    } catch (e) {
      message.channel.send(new CodeErrorEmbed(e));
    }
  });
}

export function ClientPingedMessage(client: Discord.Client) {
  client.on("message", (message) => {
    if (message.content == `<@!${client.user?.id}>`) {
      message.channel.send(
        new InformationEmbed("BumpyBot", message.member?.displayColor, [
          {
            name: "> Prefix",
            value: "b!",
            inline: true,
          },
          {
            name: "> Help",
            value: "b!help",
            inline: true,
          },
        ])
      );
    }
  });
}
