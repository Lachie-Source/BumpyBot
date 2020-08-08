import Discord from "discord.js";
import Ping from "../Commands/ping";
import Eval from "../Commands/eval";
import Invite from "../Commands/invite";
import Help from "../Commands/help";

export function CommandHandler(client: Discord.Client) {
  client.commands = new Discord.Collection();

  client.commands.set("ping", Ping);
  client.commands.set("eval", Eval);
  client.commands.set("invite", Invite);
  client.commands.set("help", Help);
}
