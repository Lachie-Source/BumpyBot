"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
async function database() {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(process.env.firebase_route),
        databaseURL: "https://bumpybot-discord.firebaseio.com",
    });
    return firebase_admin_1.default.database();
}
exports.database = database;
