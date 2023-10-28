const { Router } = require("express");
const { getCategories_Handler, createCategory_Handler } = require("../handlers/categoriesHandler");
const cateRouter = Router();

cateRouter.get("/", getCategories_Handler);
cateRouter.post("/", createCategory_Handler);

module.exports = cateRouter;
