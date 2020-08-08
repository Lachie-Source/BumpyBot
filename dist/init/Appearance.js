"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appearance = void 0;
function Appearance(client) {
    var _a, _b;
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setAvatar("https://cdn.discordapp.com/avatars/655256461101891585/d77147f69c2e4c4e4f5a340e14a4c83b.webp");
    (_b = client.user) === null || _b === void 0 ? void 0 : _b.setActivity({
        name: `Over ${client.guilds.cache.size} Guilds, ${Math.round(client.ws.ping)}ms of Ping`,
        type: "WATCHING",
        url: "https://www.youtube.com/embed/B9skoofirpA?controls=0",
    });
}
exports.Appearance = Appearance;
