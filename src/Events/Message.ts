import Discord from "discord.js";
import { ErrorEmbed } from "../structures/ErrorEmbed";

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

    console.log(
      !(message.author.id == "655256461101891585") &&
        checkcmd.permissions.includes("DEV"),
      !message.member?.hasPermission(
        checkcmd.permissions.filter((x: string) => x != "DEV")
      )
    );

    if (
      (!(message.author.id == "655256461101891585") &&
        checkcmd.permissions.includes("DEV")) ||
      !message.member?.hasPermission(
        checkcmd.permissions.filter((x: string) => x != "DEV")
      )
    ) {
      message.channel.send(
        new ErrorEmbed(
          "You Dont Have Enough Permissions To Perform This Command"
        )
      );
      return;
    }

    try {
      checkcmd.execute(message, args, client);
    } catch (e) {
      message.channel.send(new ErrorEmbed(e));
    }
  });
}
