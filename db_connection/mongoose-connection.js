const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require('dotenv').config()
const mongoDB = process.env.MONGO_USERS_URL;

main().catch(err => console.log(err));


async function main(){
    await mongoose.connect(mongoDB);
    console.log("~~~~~~~~~~~~~~~~~~~~~~MONGODB CONNECTED~~~~~~~~~~~~~~~~~~")
}