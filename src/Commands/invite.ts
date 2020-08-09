import Discord, { MessageEmbed } from "discord.js";

export = {
  name: "invite",
  aliases: [],
  permissions: ["CREATE_INSTANT_INVITE"],
  needperms: ["CREATE_INSTANT_INVITE", "SEND_MESSAGES", "EMBED_LINKS"],
  description: "Create An Invite For The Server And The Bot",
  type: "Utility",
  async execute(
    message: Discord.Message,
    args: string[],
    client: Discord.Client
  ) {
    var invite = await message.guild?.systemChannel?.createInvite();
    const embed = new MessageEmbed()
      .setTitle("Invite Links")
      .setColor(`${message.member?.displayHexColor}`)
      .setAuthor(message.member?.displayName, `${message.author.avatarURL()}`)
      .addFields([
        {
          name: "> Server Invite",
          value: `[Click Here](${invite})`,
          inline: true,
        },
        {
          name: "> Bot Invite",
          value:
            "[Click Here](https://discord.com/oauth2/authorize?client_id=741157412060528701&scope=bot&permissions=1543892215)",
          inline: true,
        },
      ]);
    message.channel.send(embed);
  },
};
