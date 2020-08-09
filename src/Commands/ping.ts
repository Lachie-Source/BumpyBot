import Discord from "discord.js";
import { MessageEmbed } from "discord.js";
import os from "os";
import osName from "os-name";
import prettyms from "pretty-ms";

export = {
  name: "ping",
  aliases: ["status"],
  permissions: [],
  description: "Get The Client's Uptime And Latency",
  type: "Utility",
  needperms: ["SEND_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS"],
  execute(message: Discord.Message, args: string[], client: Discord.Client) {
    const embed = new MessageEmbed()
      .setTitle("Ping!")
      .setDescription("Pinging...")
      .setAuthor(message.member?.displayName, `${message.author.avatarURL()}`)
      .setColor(`${message.member?.displayHexColor}`);

    message.channel.send(embed).then((msg) => {
      embed.setDescription("").addFields([
        {
          name: "> Client Latency",
          value: `\`${msg.createdTimestamp - message.createdTimestamp}ms\``,
          inline: true,
        },
        {
          name: "> API Latency",
          value: `\`${Math.round(client.ws.ping)}ms\``,
          inline: true,
        },
        {
          name: "> Client Uptime",
          value: `\`${prettyms(client.uptime ? client.uptime : 0)}\``,
          inline: true,
        },

        {
          name: "> OS Info",
          value: `\`\`\`yaml\nOS Name: ${osName(
            os.platform(),
            os.release()
          )}\nCPU Architecture: ${os.arch()}\nCPU: Intel(R) Core(TM) i5-8265U CPU @ 1.60GHz (x8)\n\`\`\``,
        },
      ]);

      msg.edit(embed);
    });
  },
};
