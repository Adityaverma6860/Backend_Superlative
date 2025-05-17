// const jwt = require("jsonwebtoken");

// const jwtAuthMiddleware = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (!authorization || !authorization.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Token Not Found" });
//   }

//   const token = authorization.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ error: "Invalid token" });
//   }
// };
const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

const GenerateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = {
  jwtAuthMiddleware,
  GenerateToken,
};
