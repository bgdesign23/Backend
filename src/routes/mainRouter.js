const { Router } = require("express");

const productsRoutes = require("./productsRoutes.js");
const cateRouter = require("./categoriesRoutes.js");
const usersRouter = require("./usersRoutes.js");

// router initializated
const mainRouter = Router();

//router paths moduls
mainRouter.use("/products", productsRoutes);
mainRouter.use("/categories", cateRouter);
mainRouter.use("/users", usersRouter);

module.exports = mainRouter;
