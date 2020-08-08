import Discord from "discord.js";
import Ping from "../Commands/ping";
import Eval from "../Commands/eval";

export function CommandHandler(client: Discord.Client) {
  client.commands = new Discord.Collection();

  client.commands.set("ping", Ping);
  client.commands.set("eval", Eval);
}
