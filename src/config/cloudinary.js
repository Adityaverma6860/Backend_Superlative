
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const { statSync, existsSync, unlinkSync } = require("fs");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

const SIZE_LIMIT = 2 * 1024 * 1024; // 2MB

const uploadSingleImageOnCloudinary = async (filePath) => {
  try {
    const stats = statSync(filePath);
    if (stats.size > SIZE_LIMIT) {
      return {
        error: `File size exceeds 2MB. Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`,
        status: 400,
      };
    }

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: process.env.CLOUDINARY_FOLDER || "employee-documents",
    });

    return response;
  } catch (error) {
    return {
      error: `Cloudinary upload failed: ${error.message}`,
      status: 500,
    };
  } finally {
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }
};

module.exports = uploadSingleImageOnCloudinary;
