// const bcrypt = require("bcryptjs");
// const User = require("../models/userModel");
// const { GenerateToken } = require("../middleware/jwt");

// // @desc Register new user
// const registerUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     const token = GenerateToken({ id: newUser._id });

//     res.status(201).json({
//       info: "User created successfully",
//       _id: newUser._id,
//       username: newUser.username,
//       email: newUser.email,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Login user
// const loginUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: "User does not exist" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const token = GenerateToken({ id: user._id });

//     res.status(200).json({
//       info: "User logged in successfully",
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Sample protected route
// const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch user profile" });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getProfile,
// };



// const bcrypt = require("bcryptjs");
// const User = require("../models/userModel");
// const { GenerateToken } = require("../middleware/jwt");

// // @desc Register user
// const registerUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     const accessToken = GenerateToken({ id: newUser._id }, "15m");

//     res
//       .cookie("accessToken", accessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 15 * 60 * 1000,
//       })
//       .status(201)
//       .json({
//         info: "User registered successfully",
//         _id: newUser._id,
//         username: newUser.username,
//         email: newUser.email,
//       });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Login user
// const loginUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: "User does not exist" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const accessToken = GenerateToken({ id: user._id }, "15m");

//     res
//       .cookie("accessToken", accessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 15 * 60 * 1000,
//       })
//       .status(200)
//       .json({
//         info: "User logged in successfully",
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//       });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Logout user
// const logoutUser = (req, res) => {
//   res
//     .clearCookie("accessToken", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     })
//     .status(200)
//     .json({ message: "Logged out successfully" });
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   logoutUser,
// };


const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { GenerateToken } = require("../middleware/jwt");
const { ApiError } = require("../utils/ApiError");
const { ApiRes } = require("../utils/ApiRes");

// @desc Register user
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Generate a 1-day token
    const token = GenerateToken({ id: newUser._id });

    res
      .status(201)
      .json(
        new ApiRes(201, {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          token,
        }, "User registered successfully")
      );
  } catch (err) {
    next(err);
  }
};

// @desc Login user
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ username });
    if (!user) {
      throw new ApiError(400, "User does not exist");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new ApiError(400, "Invalid password");
    }

    const token = GenerateToken({ id: user._id });

    res
      .status(200)
      .json(
        new ApiRes(200, {
          _id: user._id,
          username: user.username,
          email: user.email,
          token,
        }, "User logged in successfully")
      );
  } catch (err) {
    next(err);
  }
};

// @desc Logout user (client should just drop the token on their side)
const logoutUser = (req, res, next) => {
  // Since we're not using cookies, there's nothing to clear server‑side.
  res
    .status(200)
    .json(new ApiRes(200, null, "Logged out successfully; please discard your token."));
};



module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
