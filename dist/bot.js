"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const discord_js_1 = __importDefault(require("discord.js"));
const Appearance_1 = require("./init/Appearance");
const EventHandler_1 = __importDefault(require("./Events/EventHandler"));
const CommandHandler_1 = require("./structures/CommandHandler");
// Base Variables
const client = new discord_js_1.default.Client();
const token = "NzQxMTU3NDEyMDYwNTI4NzAx.XyzeoQ.YOOs9vsbojiKHxFkIG0I-YXxM_g";
// Handlers
//   Command Handler
CommandHandler_1.CommandHandler(client);
//   Event Handler
EventHandler_1.default.CommandHandlerMessage(client);
// Online
client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    // Client Init
    Appearance_1.Appearance(client);
});
client.login(token);
