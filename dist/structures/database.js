"use strict";
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://Bumpy:<password>@guilds.5zvci.mongodb.net/<dbname>?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true });
mongoClient.connect((err) => {
    const database = mongoClient.db("test");
    // perform actions on the collection object
    mongoClient.close();
});
