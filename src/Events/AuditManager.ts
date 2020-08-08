import Discord from "discord.js";

export function AuditManager(client: Discord.Client, guild: Discord.Guild) {
  guild.audit = [];
}
