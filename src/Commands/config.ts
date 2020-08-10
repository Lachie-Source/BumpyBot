import Discord from "discord.js";
import { InformationEmbed } from "../structures/Embeds/InformationEmbed";
import fetch from "node-fetch";
import { UserErrorEmbed } from "../structures/Embeds/ErrorEmbeds/UserErrorEmbed";
import { SuccessEmbed } from "../structures/Embeds/SuccessEmbed";
import { database } from "../structures/database";
import { CodeErrorEmbed } from "../structures/Embeds/ErrorEmbeds/CodeErrorEmbed";
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
    client: Discord.Client,
    database: any
  ) {
    const prefix =
      (await fetch(
        `https://bumpybot-discord.firebaseio.com/guilds/${message.guild.id}/config/prefix.json`
      ).then((req) => req.json())) || "b!";

    if (!args[0]) {
      message.channel.send(
        new InformationEmbed(
          "Config",
          `${message.member.displayHexColor}`,
          {
            user: message.member.displayName,
            url: message.author.avatarURL(),
          },
          [
            {
              name: "Prefix",
              value: prefix,
              inline: false,
            },
          ]
        )
      );
    }

    if (args[0]) {
      var embed;
      if (args[0] == "prefix") {
        if (args[1]) {
          try {
            database
              .ref(`guilds/${message.guild.id}/config/prefix`)
              .set(args[1]);
            embed = new SuccessEmbed(
              "Config",
              `${message.member.displayHexColor}`,
              {
                user: message.member.displayName,
                url: message.author.avatarURL(),
              },
              `Successfully Set The Prefix To "${args[1]}"`
            );
          } catch (e) {
            message.channel.send(new CodeErrorEmbed(e));
            return;
          }
        } else {
          try {
            database.ref(`guilds/${message.guild.id}/config/prefix`).set("b!");
            embed = new SuccessEmbed(
              "Config",
              `${message.member.displayHexColor}`,
              {
                user: message.member.displayName,
                url: message.author.avatarURL(),
              },
              'Successfully Set The Prefix To "b!"'
            );
          } catch (e) {
            message.channel.send(new CodeErrorEmbed(e));
            return;
          }
        }
      } else {
        embed = new UserErrorEmbed(
          `Unknown Config Setting "${args[0]}". Please Provide A Valid Config Setting.`
        );
      }

      message.channel.send(embed);
    }
  },
};
