const { Router } = require("express");

const {
  registerUser_Handler,
  loginUser_Handler,
} = require("../handlers/usersHandler.js");

const usersRouter = Router();

usersRouter.post("/login", loginUser_Handler);
usersRouter.post("/register", registerUser_Handler);

module.exports = usersRouter;