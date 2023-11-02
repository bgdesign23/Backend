const { Router } = require("express");

const productsRoutes = require("./productsRoutes.js");
const cateRouter = require("./categoriesRoutes.js");
const usersRouter = require("./usersRoutes.js");
const offerRouter = require("./offerRoutes.js");
const designsRouter = require("./designsRoutes.js");
const pasarelaPagos_Router = require("./pasarelaPagosRoute.js");
const couponRouter = require("./couponRoutes.js");

// router initializated
const mainRouter = Router();

//router paths moduls
mainRouter.use("/products", productsRoutes);
mainRouter.use("/categories", cateRouter);
mainRouter.use("/users", usersRouter);
mainRouter.use("/offer", offerRouter);
mainRouter.use("/designs", designsRouter);
mainRouter.use("/payment", pasarelaPagos_Router);
mainRouter.use("/coupon", couponRouter);

module.exports = mainRouter;
