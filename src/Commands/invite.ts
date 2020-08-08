import Discord, { MessageEmbed } from "discord.js";

export = {
  name: "invite",
  aliases: [],
  permissions: ["CREATE_INSTANT_INVITE"],
  async execute(
    message: Discord.Message,
    args: string[],
    client: Discord.Client
  ) {
    var invite = await message.guild?.systemChannel?.createInvite();
    const embed = new MessageEmbed()
      .setTitle("Invite Links")
      .setColor(`${message.member?.displayHexColor}`)
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