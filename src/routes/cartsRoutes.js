const { Router } = require("express");
const { 
    getAllCarts_Handler,
    getByUserCarts_Handler,
    getByIdCarts_Handler,
} = require("../handlers/cartsHandler");

const cartsRouter = Router();

cartsRouter.get("/", getAllCarts_Handler);
cartsRouter.get("/", getByUserCarts_Handler);
cartsRouter.get("/:id", getByIdCarts_Handler);

module.exports = cartsRouter;