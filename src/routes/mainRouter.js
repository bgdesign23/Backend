const { Router } = require("express");

const productsRoutes = require("./productsRoutes");
// const categoriesRoutes = require("./categoriesRoutes");

// router initializated
const mainRouter = Router();

//router paths moduls
mainRouter.use("/products", productsRoutes);
// mainRouter.use("/categories", categoriesRoutes);

module.exports = mainRouter;
