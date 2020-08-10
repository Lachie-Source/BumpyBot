import admin from "firebase-admin";

export async function database() {
  admin.initializeApp({
    credential: admin.credential.cert(process.env.firebase_route),
    databaseURL: "https://bumpybot-discord.firebaseio.com",
  });

  return admin.database();
}
