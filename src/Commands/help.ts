import Discord, { MessageEmbed } from "discord.js";
import { MultiPageEmbed } from "../structures/MultiPageEmbed";
import { toTitleCase } from "../functions/titleCases";

export = {
  name: "help",
  aliases: ["commands"],
  permissions: [],
  execute(message: Discord.Message, args: string[], client: Discord.Client) {
    var index = -1;
    const embeds = new MultiPageEmbed(
      client.commands.map((cmd: any) => {
        index++;
        return new MessageEmbed()
          .setAuthor(message.member?.displayName, message.author.avatarURL())
          .setTitle(
            `Help - Page ${index + 1}/${client.commands.array().length}`
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
