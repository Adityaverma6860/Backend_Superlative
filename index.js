// const express = require('express');
// const app = express();
// const dotenv = require('dotenv');
// const db  = require('./src/config/db');
// const userRoutes= require('./src/routes/userRoutes');
// const candidateRoutes= require('./src/routes/candidateRoutes');



// require('dotenv').config()


// // app.use(cors());


// app.use(express.json());

// app.use("/users", userRoutes);
// app.use('/api/candidates', candidateRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // app.use(express.static('public/doc'))



const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const db = require("./src/config/db"); // assuming this connects to MongoDB
const userRoutes = require("./src/routes/userRoutes");
const candidateRoutes = require("./src/routes/candidateRoutes");
const employeeRoutes = require("./src/routes/employeeRoutes"); 


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder (if needed)
// app.use(express.static("public/doc"));

app.use("/users", userRoutes);
app.use("/api/candidates", candidateRoutes);
app.use('/api/employees', employeeRoutes);


// Server start
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
