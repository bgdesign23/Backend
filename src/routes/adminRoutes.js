const { Router } = require("express");
const { 
    getAdminHandler, 
    postAdminHandler, 
    deleteAdminHandler, 
    getAdminByIdHandler,
    restoreAdminHandler,
    updateAdminHandler,
} = require("../handlers/adminHandler");
const adminRouter = Router();

// GET;
adminRouter.get("/", getAdminHandler);
adminRouter.get("/:id", getAdminByIdHandler);
adminRouter.get("/restore/:id", restoreAdminHandler);
// POST;
adminRouter.post("/create", postAdminHandler);
// PUT;
adminRouter.put("/:id", updateAdminHandler);
// DELETE;
adminRouter.delete("/delete/:id", deleteAdminHandler);

module.exports = adminRouter;