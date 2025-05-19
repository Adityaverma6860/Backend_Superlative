const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controller/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/profile",getProfile);
router.post("/logout", logoutUser);



module.exports = router;
