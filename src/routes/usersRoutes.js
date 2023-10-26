const { Router } = require("express");

const {
  registerUser_Handler,
  loginUser_Handler,
} = require("../handlers/usersHandler.js");

// Manejo de archivos "file" (imagen)
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

const usersRouter = Router();

usersRouter.post("/login", loginUser_Handler);
usersRouter.post("/register", /* upload.fields([{ name: "image", maxCount: 1 }]), */ registerUser_Handler);

module.exports = usersRouter;