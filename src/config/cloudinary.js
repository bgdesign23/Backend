const cloudinary = require("cloudinary").v2;

const { CLOUDINARY_NAME_IMAGE, CLOUDINARY_KEY_IMAGE, CLOUDINARY_SECRET_IMAGE } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME_IMAGE,
  api_key: CLOUDINARY_KEY_IMAGE,
  api_secret: CLOUDINARY_SECRET_IMAGE,
});

const uploadImageCloudinary = cloudinary;

module.exports = uploadImageCloudinary;
