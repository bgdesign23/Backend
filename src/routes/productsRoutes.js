const { Router } = require("express");
const {
  getProduct_handler,
  postProduct_handler,
  getProduct_ById_handler,
  getProduct_ByName_handler,
  deleteProduct_handler,
  postProduct_Rating_Handler,
  getProduct_ByHashtag_handler,
  restoreProduct_handler,
  eliminatedProducts_Handler,
  updateProduct_Handler,
} = require("../handlers/productsHandler");
const prodRouter = Router();

// Manejo de archivos "file" (imagen)
const { uploadProductCloudinary } = require("../middlewares/cloudinary.js");

//GETS
prodRouter.get("/", getProduct_handler);
prodRouter.get("/:id", getProduct_ById_handler);
prodRouter.get("/search/:name", getProduct_ByName_handler);
prodRouter.get("/searchByHashtag/:hashtag", getProduct_ByHashtag_handler);
prodRouter.get("/restore/eliminated", eliminatedProducts_Handler);
prodRouter.put("/restore/:id", restoreProduct_handler);
//POST
prodRouter.post(
  "/create",
  uploadProductCloudinary.single("image"),
  postProduct_handler
);
//DELETE
prodRouter.delete("/delete/:id", deleteProduct_handler);
//PUT
prodRouter.put("/rating/:id", postProduct_Rating_Handler);
prodRouter.put("/:id", updateProduct_Handler);

module.exports = prodRouter;
