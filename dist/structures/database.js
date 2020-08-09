"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const node_fetch_1 = __importDefault(require("node-fetch"));
async function database() {
    var serviceAccount = await node_fetch_1.default(process.env.firebase_sdk ? process.env.firebase_sdk : "").then((req) => {
        req.json();
    });
    console.log(serviceAccount);
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount),
        databaseURL: "https://bumpybot-discord.firebaseio.com",
    });
    return firebase_admin_1.default.database();
}
exports.database = database;
