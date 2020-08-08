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

    try {
      checkcmd.execute(message, args, client);
    } catch (e) {
      message.channel.send(new ErrorEmbed(e));
    }
  });
}
