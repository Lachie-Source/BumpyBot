"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const ping_1 = __importDefault(require("../Commands/ping"));
const eval_1 = __importDefault(require("../Commands/eval"));
const invite_1 = __importDefault(require("../Commands/invite"));
const help_1 = __importDefault(require("../Commands/help"));
const info_1 = __importDefault(require("../Commands/info"));
const config_1 = __importDefault(require("../Commands/config"));
const kick_1 = __importDefault(require("../Commands/kick"));
function CommandHandler(client) {
    client.commands = new discord_js_1.default.Collection();
    client.commands.set("ping", ping_1.default);
    client.commands.set("eval", eval_1.default);
    client.commands.set("invite", invite_1.default);
    client.commands.set("help", help_1.default);
    client.commands.set("info", info_1.default);
    client.commands.set("config", config_1.default);
    client.commands.set("kick", kick_1.default);
}
exports.CommandHandler = CommandHandler;
