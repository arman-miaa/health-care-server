import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config";

// ✅ Configure ONCE (outside function)
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

async function uploadToCloudinary(file: Express.Multer.File) {
  try {
    const fileName = path.parse(file.originalname).name;

    const result = await cloudinary.uploader.upload(file.path, {
      public_id: `${fileName}-${Date.now()}`,
    });

    // ✅ delete local file after success
    fs.unlinkSync(file.path);

    return result;
  } catch (error) {
    // ⚠️ delete local file even if upload fails
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    throw error; // let controller handle it
  }
}

const upload = multer({ storage });

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
