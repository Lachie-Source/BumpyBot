import Discord from "discord.js";
import { MessageEmbed } from "discord.js";
import prettyMilliseconds from "pretty-ms";

export = {
  name: "ping",
  aliases: ["status"],
  permissions: ["ADMINISTRATOR"],
  execute(message: Discord.Message, args: string[], client: Discord.Client) {
    const embed = new MessageEmbed()
      .setTitle("Ping!")
      .setDescription("Pinging...")
      .setAuthor(message.member?.displayName, message.author.avatarURL())
      .setColor(`${message.member?.displayHexColor}`);

    message.channel.send(embed).then((msg) => {
      embed
        .setDescription("")
        .addField(
          "> Client Latency",
          `\`${msg.createdTimestamp - message.createdTimestamp}ms\``,
          true
        )
        .addField("> API Latency", `\`${Math.round(client.ws.ping)}ms\``, true)
        .addField(
          "> Client Uptime",
          `\`${prettyMilliseconds(client.uptime)}\``,
          true
        );

      msg.edit(embed);
    });
  },
};
