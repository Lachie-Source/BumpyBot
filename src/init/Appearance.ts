import { Client } from "discord.js";

export function Appearance(client: Client) {
  client.user?.setAvatar(
    `${client.guilds.cache
      .get("735552284712239215")
      ?.members.cache.get("655256461101891585")
      ?.user.avatarURL()}`
  );

  client.user?.setActivity({
    name: `Over ${client.guilds.cache.size} Guilds`,
    type: "WATCHING",
    url: "https://www.youtube.com/watch?v=B9skoofirpA",
  });
}
