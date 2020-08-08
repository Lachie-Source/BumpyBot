import Discord from "discord.js";
import { MessageEmbed } from "discord.js";
import { ErrorEmbed } from "../structures/ErrorEmbed";
import { inspect } from "util";
import hastebin from "hastebin";

export = {
  name: "eval",
  aliases: ["inspect", "e", "i"],
  permissions: ["DEV"],
  async execute(message: Discord.Message, args: any, client: Discord.Client) {
    const embed = new MessageEmbed()
      .setTitle("Eval")
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription("Loading...")
      .setColor(`${message.member?.displayHexColor}`);

    try {
      message.channel.send(embed).then(async (m) => {
        if (!args[0]) {
          m.edit(new ErrorEmbed("Please Supply Valid JavaScript"));

          return;
        }

        args = args.join(" ");

        embed.setDescription("Evaluating");
        m.edit(embed);

        try {
          const code = await eval(args);
          const inspected = await inspect(code);

          if (inspected.toString().length < 1900 - args.length) {
            embed
              .setDescription(
                `\`\`\`js\n${args}\n\`\`\`\n\n\`\`\`js\n${inspected}\n\`\`\``
              )
              .setColor(`${message.member?.displayHexColor}`);
            m.edit(embed);
          } else {
            // Hastebin Stuff

            var haste = await hastebin.createPaste(inspected, {
              server: "https://hastebin.com",
            });

            embed
              .setDescription(`\`\`\`js\n${args}\`\`\`\n\n${haste}`)
              .setColor(`${message.member?.displayHexColor}`);

            m.edit(embed);
          }
        } catch (err) {
          m.edit(new ErrorEmbed(`\n\`\`\`js\n${err}\n\`\`\``));
        }
      });
    } catch (err) {
      message.channel.send(new ErrorEmbed(`\`\`\`\`js\n${err}\n\`\`\``));
    }
  },
};
