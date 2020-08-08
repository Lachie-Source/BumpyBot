// Modules
import Discord from "discord.js";
import { Appearance } from "./init/Appearance";
import EventHandler from "./Events/EventHandler";
import { CommandHandler } from "./structures/CommandHandler";

import * as dotenv from "dotenv";

dotenv.config();

// Base Variables
const client = new Discord.Client();
const token = process.env.token;

// Handlers
try {
  //   Command Handler
  CommandHandler(client);
  //   Event Handler
  EventHandler.CommandHandlerMessage(client);
  EventHandler.ClientPingedMessage(client);
} catch (e) {
  console.log(e);
}
// Online
client.on("ready", () => {
  console.log(
    `Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
  );

  // Client Init
  Appearance(client);
});

client.login(token);
