const { Router } = require("express");

const {
  registerUser_Handler,
  loginUser_Handler,
} = require("../handlers/usersHandler.js");

// Manejo de archivos "file" (imagen)
const { uploadUserCloudinary } = require("../middlewares/cloudinary.js");

const usersRouter = Router();

usersRouter.post("/login", loginUser_Handler);
usersRouter.post(
  "/register",
  uploadUserCloudinary.single("image"),
  registerUser_Handler
);

module.exports = usersRouter;
