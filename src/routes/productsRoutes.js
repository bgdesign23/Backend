const { Router } = require("express");
const {
  getProduct_handler,
  postProduct_handler,
  getProduct_ById_handler,
  getProduct_ByName_handler,
  deleteProduct_handler,
  postProduct_Rating_Handler,
} = require("../handlers/productsHandler");
const prodRouter = Router();

// Manejo de archivos "file" (imagen)
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

//GETS
prodRouter.get("/", getProduct_handler);
prodRouter.get("/:id", getProduct_ById_handler);
prodRouter.get("/search/:name", getProduct_ByName_handler);
//POST
prodRouter.post("/create", /* upload.fields([{ name: "image", maxCount: 1 }]), */ postProduct_handler);
//DELETE
prodRouter.delete("/delete/:id", deleteProduct_handler);
//PUT
prodRouter.put("/rating/:id", postProduct_Rating_Handler);

module.exports = prodRouter;
