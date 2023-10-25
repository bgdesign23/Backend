const { Router } = require("express");
const { getCategories_Handler } = require("../handlers/categoriesHandler");
const cateRouter = Router();

cateRouter.get("/", getCategories_Handler);

module.exports = cateRouter;
