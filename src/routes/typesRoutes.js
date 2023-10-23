const { Router } = require("express");
const typesRouter = Router();
const getType = require("../controllers/typeControllers");

typesRouter.get("/", getType);

module.exports = typesRouter;
