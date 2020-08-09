import Discord, { MessageEmbed } from "discord.js";
import { MultiPageEmbed } from "../structures/Embeds/MultiPageEmbed";
import { toTitleCase } from "../functions/titleCases";
import { UserErrorEmbed } from "../structures/Embeds/ErrorEmbeds/UserErrorEmbed";

export = {
  name: "help",
  aliases: ["commands"],
  permissions: ["ADD_REACTIONS"],
  description: "Displays All The Commands",
  type: "Utility",
  needperms: [
    "SEND_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ADD_REACTIONS",
  ],
  execute(message: Discord.Message, args: string[], client: Discord.Client) {
    var index = -1;

    const glossaryEmbed = new MessageEmbed()
      .setAuthor(message.member?.displayName, `${message.author.avatarURL()}`)
      .setColor(`${message.member?.displayHexColor}`)
      .setFooter(
        'React With "⏩" To Turn A Page, React With "⏪" To Go Back A Page'
      )
      .setTitle("Help - Glossary");

    client.commands
      .filter((cmd: any) => !cmd.permissions.includes("DEV"))
      .forEach((cmd: any) => {
        glossaryEmbed.addField(
          `> ${toTitleCase(cmd.name)}`,
          `\`${cmd.description}\``,
          false
        );
      });

    const embeds = new MultiPageEmbed([
      glossaryEmbed,
      ...client.commands
        .filter((x: any) => !x.permissions.includes("DEV"))
        .map((cmd: any) => {
          index++;
          return new MessageEmbed()
            .setAuthor(
              message.member?.displayName,
              `${message.author.avatarURL()}`
            )
            .setFooter(
              'React With "⏩" To Turn A Page, React With "⏪" To Go Back A Page'
            )
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
                    ? cmd.permissions.join(", ")
                    : "None",
              },
              {
                name: "> Bot's Required Permissions",
                value:
                  cmd.needperms.toString().length != 0
                    ? cmd.needperms.join(", ")
                    : "None",
                inline: true,
              },
              {
                name: "> Description",
                value: cmd.description,
              },
            ]);
        }),
    ]);

    if (args[0]) {
      const checkcmd = client.commands
        .filter((cmd: any) => !cmd.permissions.includes("DEV"))
        .map((cmd: any) => cmd.name)
        .indexOf(args[0]);

      if (checkcmd === -1) {
        message.channel.send(
          new UserErrorEmbed(`Unknown Command "${args[0]}"`)
        );
        return;
      }

      embeds.setPage(checkcmd + 1);
    }

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
          time: 300000,
        });
        const backwards = msg.createReactionCollector(backwardsFilter, {
          time: 300000,
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
