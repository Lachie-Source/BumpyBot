import Discord from "discord.js";
import { MessageEmbed } from "discord.js";

export = {
  name: "information",
  aliases: ["info"],
  permissions: [],
  description: "All The Information For BumpyBot",
  type: "Utility",
  needperms: ["SEND_MESSAGES", "EMBED_LINKS"],
  execute(message: Discord.Message, args: string[], client: Discord.Client) {
    const embed = new MessageEmbed()
      .setAuthor(message.member?.displayName, `${message.author.avatarURL()}`)
      .setColor(`${message.member?.displayHexColor}`)
      .setTitle("Information")
      .addFields([
        {
          name: "> How Can I Support BumpyBot?",
          value: `\`You Can Support BumpyBot By "Starring" BumpyBot's Github Repository, Or You Can Contribute To The Repository.\``,
        },
        {
          name: "> Why BumpyBot?",
          value: `\`BumpyBot Focuses On Ease Of Development, Rather Than Ease Of Use. This Way Our Development Workflow Is Efficent And Simple, So BumpyBot Can Continue To Update Frequently.\``,
        },
        {
          name: "> How Can I Add BumpyBot To My Server?",
          value: `[Click Here!](https://discord.com/oauth2/authorize?client_id=741157412060528701&scope=bot&permissions=1543892215)`,
        },
        {
          name: "> Yeh, I Can Help; But Where?",
          value: `[Click Here!](https://github.com/Lachie-Source/BumpyBot)`,
        },
      ]);

    message.channel.send(embed);
  },
};
