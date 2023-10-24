const { Router } = require("express");

const productsRoutes = require("./productsRoutes");
const cateRouter = require("./categoriesRoutes");

// router initializated
const mainRouter = Router();

//router paths moduls
mainRouter.use("/products", productsRoutes);
mainRouter.use("/categories", cateRouter);

module.exports = mainRouter;
