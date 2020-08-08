"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const discord_js_1 = __importDefault(require("discord.js"));
const Appearance_1 = require("./init/Appearance");
const EventHandler_1 = __importDefault(require("./Events/EventHandler"));
const CommandHandler_1 = require("./structures/CommandHandler");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Base Variables
const client = new discord_js_1.default.Client();
const token = process.env.token;
// Handlers
try {
    //   Command Handler
    CommandHandler_1.CommandHandler(client);
    //   Event Handler
    EventHandler_1.default.CommandHandlerMessage(client);
    EventHandler_1.default.ClientPingedMessage(client);
}
catch (e) {
    console.log(e);
}
// Online
client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    // Client Init
    Appearance_1.Appearance(client);
});
client.login(token);
