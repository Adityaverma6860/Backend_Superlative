const multer = require("multer");
const { existsSync, mkdirSync } = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");

if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
//   if (!allowedTypes.includes(file.mimetype)) {
//     return cb(new Error("Only JPG, PNG, or PDF files are allowed!"), false);
//   }
//   cb(null, true);
// };


const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Only JPG, PNG, or PDF files are allowed!");
    error.status = 400;
    return cb(error, false);
  }
  cb(null, true);
};


const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;

