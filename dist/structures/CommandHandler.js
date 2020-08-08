"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const ping_1 = __importDefault(require("../Commands/ping"));
const eval_1 = __importDefault(require("../Commands/eval"));
function CommandHandler(client) {
    client.commands = new discord_js_1.default.Collection();
    client.commands.set("ping", ping_1.default);
    client.commands.set("eval", eval_1.default);
}
exports.CommandHandler = CommandHandler;
