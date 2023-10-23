const { Router } = require("express");
const {
  getProduct_handler,
  postProduct_handler,
} = require("../handlers/productsHandler");
const prodRouter = Router();

prodRouter.get("/", getProduct_handler);
// prodRouter.get("/:id");
// prodRouter.get("/nav/:name");
prodRouter.post("/create", postProduct_handler);
// prodRouter.delete("/delete/:id");

module.exports = prodRouter;
