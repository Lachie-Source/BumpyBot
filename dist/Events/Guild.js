"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
function Logger(client) {
    client.on("guildCreate", (guild) => {
        console.log(`Added To ${guild.name} (#${client.guilds.cache.size})`);
    });
    client.on("guildDelete", (guild) => {
        console.log(`Removed From ${guild.name} (#${client.guilds.cache.size})`);
    });
}
exports.Logger = Logger;
