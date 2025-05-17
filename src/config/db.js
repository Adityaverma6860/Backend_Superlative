require('dotenv').config()
const mongoose = require("mongoose");
console.log(process.env.MONGODB_URI);


// const mongoURL = "mongodb://127.0.0.1:27017/Superlative";
const mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDb Server");
});
db.on("error", (err) => {
  console.error("MongoDb connection to error:".err);
});
db.on("disconnected", () => {
  console.log("MongoDb disconnected");
});
