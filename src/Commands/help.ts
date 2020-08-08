import Discord, { MessageEmbed } from "discord.js";
import { MultiPageEmbed } from "../structures/Embeds/MultiPageEmbed";
import { toTitleCase } from "../functions/titleCases";

export = {
  name: "help",
  aliases: ["commands"],
  permissions: [],
  description: "Displays All The Commands",
  type: "Utility",
  execute(message: Discord.Message, args: string[], client: Discord.Client) {
    var index = -1;
    const embeds = new MultiPageEmbed(
      client.commands
        .filter((x: any) => !x.permissions.includes("DEV"))
        .map((cmd: any) => {
          index++;
          return new MessageEmbed()
            .setAuthor(message.member?.displayName, message.author.avatarURL())
            .setTitle(
              `Help - Page ${index + 1}/${
                client.commands
                  .array()
                  .filter((x: any) => !x.permissions.includes("DEV")).length
              }`
            )
            .setColor(`${message.member?.displayHexColor}`)
            .addFields([
              {
                name: "> Command",
                value: toTitleCase(cmd.name),
                inline: true,
              },
              {
                name: "> Aliases",
                value:
                  cmd.aliases.toString().length != 0
                    ? cmd.aliases
                        .map((command: any) => toTitleCase(command))
                        .join(", ")
                    : "None",
                inline: true,
              },
              {
                name: "> Type",
                value: toTitleCase(cmd.type),
                inline: true,
              },
              {
                name: "> Required Permissions",
                value:
                  cmd.permissions.toString().length != 0
                    ? cmd.permissions
                        .map((command: any) => toTitleCase(command))
                        .join(", ")
                    : "None",
              },
              {
                name: "> Description",
                value: cmd.description,
              },
            ]);
        })
    );
    message.channel
      .send(embeds.MessageEmbed())
      .then(async (msg: Discord.Message) => {
        await msg.react("⏪");
        await msg.react("⏩");

        const forwardFilter = (reaction: any, user: Discord.User) =>
          reaction.emoji.name === "⏩" && user.id === message.author.id;
        const backwardsFilter = (reaction: any, user: Discord.User) =>
          reaction.emoji.name === "⏪" && user.id === message.author.id;

        const forward = msg.createReactionCollector(forwardFilter, {
          time: 60000,
        });
        const backwards = msg.createReactionCollector(backwardsFilter, {
          time: 60000,
        });

        forward.on("collect", async (r) => {
          embeds.next();
          msg.edit(embeds.MessageEmbed());

          const userReactions = msg.reactions.cache.filter((reaction) =>
            reaction.users.cache.has(message.author.id)
          );
          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(message.author.id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }
        });
        backwards.on("collect", async (r) => {
          embeds.backwards();
          msg.edit(embeds.MessageEmbed());

          const userReactions = msg.reactions.cache.filter((reaction) =>
            reaction.users.cache.has(message.author.id)
          );
          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(message.author.id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }
        });
      });
  },
};
