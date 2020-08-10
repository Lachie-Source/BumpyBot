import Discord from "discord.js";
export function Logger(client: Discord.Client) {
  client.on("guildCreate", (guild) => {
    console.log(`Added To ${guild.name} (#${client.guilds.cache.size})`);
  });
  client.on("guildDelete", (guild) => {
    console.log(`Removed From ${guild.name} (#${client.guilds.cache.size})`);
  });
}
