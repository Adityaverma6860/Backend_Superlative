// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");

// const db = require("./src/config/db"); // assuming this connects to MongoDB
// const userRoutes = require("./src/routes/userRoutes");
// const candidateRoutes = require("./src/routes/candidateRoutes");
// const employeeRoutes = require("./src/routes/employeeRoutes"); 

// require('dotenv').config();
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Static folder (if needed)
// // app.use(express.static("public/doc"));

// app.use("/users", userRoutes);
// app.use("/api/candidates", candidateRoutes);
// app.use('/api/employees', employeeRoutes);


// // Server start
// app.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`);
// });



const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { globalErrorHandler } = require("./src/utils/globalErrorhandler");

const db = require("./src/config/db"); 
const userRoutes = require("./src/routes/userRoutes");
const candidateRoutes = require("./src/routes/candidateRoutes");
const employeeRoutes = require("./src/routes/employeeRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(globalErrorHandler);

// Enable CORS with credentials

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,              
  })
);

// app.use(cors());

// connectDB();

// API Routes
app.use("/users", userRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/employees", employeeRoutes);

// Server start
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
