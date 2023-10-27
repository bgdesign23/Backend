require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { CLOUDINARY_NAME_IMAGE, CLOUDINARY_KEY_IMAGE, CLOUDINARY_SECRET_IMAGE } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME_IMAGE,
  api_key: CLOUDINARY_KEY_IMAGE,
  api_secret: CLOUDINARY_SECRET_IMAGE,
});

const storageProducts = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Products",
    allowed_formats: ["jpg", "jpeg", "png", "PNG"],
  },
});

const storageUsers = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Users",
    allowed_formats: ["jpg", "jpeg", "png", "PNG"],
  },
});

const uploadProductCloudinary = multer({
  storage: storageProducts,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) {
      return cb(new Error("File type is not supported"), false);
    }
    cb(null, true);
  },
});

const uploadUserCloudinary = multer({
  storage: storageUsers,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) {
      return cb(new Error("File type is not supported"), false);
    }
    cb(null, true);
  },
});

module.exports = { uploadProductCloudinary, uploadUserCloudinary };
