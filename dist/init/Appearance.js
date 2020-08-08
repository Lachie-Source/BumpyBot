"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appearance = void 0;
function Appearance(client) {
    var _a, _b, _c, _d;
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setAvatar(`${(_c = (_b = client.guilds.cache
        .get("735552284712239215")) === null || _b === void 0 ? void 0 : _b.members.cache.get("655256461101891585")) === null || _c === void 0 ? void 0 : _c.user.avatarURL()}`);
    (_d = client.user) === null || _d === void 0 ? void 0 : _d.setActivity({
        name: `Over ${client.guilds.cache.size} Guilds, ${Math.round(client.ws.ping)}ms of Ping`,
        type: "WATCHING",
        url: "https://www.youtube.com/embed/B9skoofirpA?controls=0",
    });
}
exports.Appearance = Appearance;
