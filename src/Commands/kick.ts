import Discord from "discord.js";
import { CodeErrorEmbed } from "../structures/Embeds/ErrorEmbeds/CodeErrorEmbed";
import { UserErrorEmbed } from "../structures/Embeds/ErrorEmbeds/UserErrorEmbed";
import { SuccessEmbed } from "../structures/Embeds/SuccessEmbed";

export = {
  name: "kick",
  aliases: [],
  permissions: ["KICK_MEMBERS"],
  description: "Get The Client's Uptime And Latency",
  type: "Moderation",
  needperms: ["SEND_MESSAGES", "EMBED_LINKS", "KICK_MEMBERS"],
  usage: '(Prefix)kick <User ID | User Tag> [Reason="No Reason Provided"]',
  async execute(
    message: Discord.Message,
    args: string[],
    client: Discord.Client,
    database: any
  ) {
    if (args[0]) {
      const member =
        message.guild.members.cache.get(args[0]) ||
        message.mentions.users.get(args[0]);
      if (!member) {
        // Invalid Member
        new UserErrorEmbed("Please Suply A Valid User ID Or User Tag");
      } else {
        if (!args[1]) args[1] = "No Reason Provided";

        try {
          database
            .ref(`guilds/${message.guild.id}/moderation/${member.id}`)
            .push({
              reason: args[1],
              time: message.createdAt,
              mod: message.author.id,
            });

          message.guild.members.cache.get(member.id).kick();

          message.channel.send(
            new SuccessEmbed(
              "Kick",
              `${message.member.displayHexColor}`,
              {
                user: message.member.displayName,
                url: message.author.avatarURL(),
              },
              `Successfully Kicked ${
                message.guild.members.cache.get(member.id).user.username
              }`
            )
          );
        } catch (e) {
          message.channel.send(new CodeErrorEmbed(e));
        }
      }
    } else {
      message.channel.send(
        new UserErrorEmbed("Please Suply A User ID Or User Tag")
      );
    }
  },
};
