const { Router } = require("express");
const {
  getAdminHandler,
  postAdminHandler,
  deleteAdminHandler,
  getAdminByIdHandler,
  restoreAdminHandler,
  updateAdminHandler,
  eliminatedAdminHandler,
} = require("../handlers/adminHandler");
const adminRouter = Router();

// GET;
adminRouter.get("/", getAdminHandler);
adminRouter.get("/:id", getAdminByIdHandler);
adminRouter.put("/restore/:id", restoreAdminHandler);
adminRouter.get("/res/eliminated", eliminatedAdminHandler);
// POST;
adminRouter.post("/create", postAdminHandler);
// PUT;
adminRouter.put("/:id", updateAdminHandler);
// DELETE;
adminRouter.delete("/delete/:id", deleteAdminHandler);

module.exports = adminRouter;
