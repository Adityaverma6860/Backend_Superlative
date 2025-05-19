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




// require('dotenv').config();
// const mongoose = require("mongoose");

// // Use environment variable from .env file
// const mongoURL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Superlative";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(mongoURL, {
//       useNewUrlParser: true,
//       // useUnifiedTopology: true, // optional in modern versions
//     });

//     console.log(" Connected to MongoDB");
//   } catch (err) {
//     console.error(" MongoDB connection error:", err.message);
//     process.exit(1); // exit process if DB connection fails
//   }

//   mongoose.connection.on("disconnected", () => {
//     console.log(" MongoDB disconnected");
//   });
// };

// module.exports = connectDB;
