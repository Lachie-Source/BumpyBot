import Discord, { MessageEmbed } from "discord.js";
import { MultiPageEmbed } from "../structures/MultiPageEmbed";
import { toTitleCase } from "../functions/titleCases";

export = {
  name: "help",
  aliases: ["commands"],
  permissions: [],
  execute(message: Discord.Message, args: string[], client: Discord.Client) {
    const embeds = new MultiPageEmbed(
      client.commands.map((cmd: any, index: number) => {
        return new MessageEmbed()
          .setAuthor(message.member?.displayName)
          .setTitle(`Help - Page ${index + 1}`)
          .setColor(`${message.member?.displayHexColor}`)
          .addFields([
            {
              name: "Command",
              value: toTitleCase(cmd),
              inline: true,
            },
          ]);
      })
    );
  },
};
