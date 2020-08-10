import Discord from "discord.js";
import { InformationEmbed } from "../structures/Embeds/InformationEmbed";

export = {
  name: "config",
  aliases: ["settings", "configuration"],
  permissions: ["MANAGE_SERVER"],
  description: "Configure BumpyBot Just How You Like It",
  type: "Utility",
  needperms: ["SEND_MESSAGES", "EMBED_LINKS"],
  usage: "WIP",
  async execute(
    message: Discord.Message,
    args: string[],
    client: Discord.Client
  ) {
    const prefix =
      (await fetch(
        `https://bumpybot-discord.firebaseio.com/guilds/${message.guild.id}/config/prefix.json`
      ).then((req) => req.text())) || "b!";

    if (!args[0]) {
      message.channel.send(
        new InformationEmbed(
          "Config",
          `${message.member.displayHexColor}`,
          [
            {
              name: "Prefix",
              value: prefix,
              inline: false,
            },
          ],
          {
            user: message.member.displayName,
            url: message.author.avatarURL(),
          }
        )
      );
    }
  },
};
