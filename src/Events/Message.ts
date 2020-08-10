import Discord, { Message, MessageEmbed } from "discord.js";
import { UserErrorEmbed } from "../structures/Embeds/ErrorEmbeds/UserErrorEmbed";
import { CodeErrorEmbed } from "../structures/Embeds/ErrorEmbeds/CodeErrorEmbed";
import { InformationEmbed } from "../structures/Embeds/InformationEmbed";
import fetch from "node-fetch";

export function CommandHandlerMessage(client: Discord.Client) {
  client.on("message", async (message) => {
    const prefix =
      (await fetch(
        `https://bumpybot-discord.firebaseio.com/guilds/${message.guild.id}/config/prefix.json`
      ).then((req) => req.json())) || "b!";

    if (message.channel.type == "dm") return;
    // Handler
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args[0].toLowerCase();
    args.shift();

    const checkcmd =
      client.commands.get(command) ||
      client.commands.find(
        (cmd: any) => cmd.aliases && cmd.aliases.includes(command)
      );

    if (!checkcmd) return;

    if (!message.guild?.me?.hasPermission(checkcmd.needperms)) {
      message.channel.send(
        new UserErrorEmbed("I Dont Have Permission To Perform This Command")
      );
      return;
    }

    if (
      (!(message.author.id == "655256461101891585") &&
        checkcmd.permissions.includes("DEV")) ||
      !message.member?.hasPermission(
        checkcmd.permissions.filter((x: string) => x != "DEV")
      )
    ) {
      message.channel.send(
        new UserErrorEmbed("You Dont Have Permission To Perform This Command")
      );
      return;
    }

    try {
      checkcmd.execute(message, args, client);
    } catch (e) {
      message.channel.send(new CodeErrorEmbed(e));
    }
  });
}

export function ClientPingedMessage(client: Discord.Client) {
  client.on("message", (message) => {
    if (message.content == `<@!${client.user?.id}>`) {
      message.channel.send(
        new InformationEmbed("BumpyBot", message.member?.displayColor, [
          {
            name: "> Prefix",
            value: "b!",
            inline: true,
          },
          {
            name: "> All Commands",
            value: "b!help",
            inline: true,
          },
          {
            name: "> Additional Information",
            value: "b!info",
            inline: true,
          },
        ])
      );
    }
  });
}

export function ClientDM(client: Discord.Client) {
  client.on("message", (message) => {
    if (message.channel.type == "dm") {
      if (message.content.startsWith("b!")) {
        const args = message.content.slice(2).split(/ +/);
        const command = args[0].toLowerCase();
        args.shift();

        if (command == "respond" && args[0]) {
          var guild = client.guilds.cache.find(
            (x) => !!x.members.cache.get(args[0])
          );

          if (!guild) {
            message.channel.send(
              "BUMPY U HAVE 2 BRAIN CELLS TTHATS NOT A MEMBER"
            );
            return;
          }

          var member = guild.members.cache.find((x) => x.id == args[0]);
          if (!member) {
            message.channel.send(
              "BUMPY U HAVE 2 BRAIN CELLS TTHATS NOT A MEMBER"
            );
            return;
          }
          args.shift();

          const embed = new MessageEmbed()
            .setAuthor(
              `${message.author?.username} | ${message.author.id}`,
              `${message.author.avatarURL()}`
            )
            .setColor(`${message.member?.displayHexColor}`)
            .setDescription(args.join(" "));

          member?.user.send(embed);
        }
        return;
      }

      if (message.author.bot) return;
      const embed = new MessageEmbed()
        .setAuthor(
          `${message.author?.username} | ${message.author.id}`,
          `${message.author.avatarURL()}`
        )
        .setColor(`${message.member?.displayHexColor}`)
        .setDescription(message.content);

      client.guilds.cache
        .get("735552284712239215")
        ?.members.cache.get("655256461101891585")
        ?.user.send(embed);
    }

    // Check for dev responce
  });
}
