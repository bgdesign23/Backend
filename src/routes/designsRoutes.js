const { Router } = require("express");

const {
  getDesigns_Handler,
} = require("../handlers/designsHandler.js");

const usersRouter = Router();

usersRouter.get("/", getDesigns_Handler);

module.exports = usersRouter;
