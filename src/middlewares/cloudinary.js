const fs = require("fs");
const uploadImageCloudinary = require("../config/cloudinary.js");

const postImageProductCloudinary = (image) => {
  return new Promise((resolve, reject) => {
    uploadImageCloudinary.uploader.upload(
      image,
      { resource_type: "image", folder: "/productsfiles", overwrite: true },
      (error, result) => {
        fs.unlink(image, (deleteErr) => {
          if (deleteErr) {
            console.error(
              "Error al eliminar el archivo temporal: ",
              deleteErr.message
            );
          }
          if (error) {
            console.error(
              "Error al cargar el archivo en Cloudinary: ",
              error.message
            );
            reject(error);
          } else {
            console.log("Temp file was deleted " + result.secure_url);
            resolve(result.secure_url);
          }
        });
      }
    );
  });
};

const postImageUserCloudinary = (image) => {
  return new Promise((resolve, reject) => {
    uploadImageCloudinary.uploader.upload(
      image,
      { resource_type: "image", folder: "/usersfiles", overwrite: true },
      (error, result) => {
        fs.unlink(image, (deleteErr) => {
          if (deleteErr) {
            console.error(
              "Error al eliminar el archivo temporal: ",
              deleteErr.message
            );
          }
          if (error) {
            console.error(
              "Error al cargar el archivo en Cloudinary: ",
              error.message
            );
            reject(error);
          } else {
            console.log("Temp file was deleted " + result.secure_url);
            resolve(result.secure_url);
          }
        });
      }
    );
  });
};

module.exports = { postImageProductCloudinary, postImageUserCloudinary };
