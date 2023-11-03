const { Router } = require("express");
const { 
    getAdminHandler, 
    postAdminHandler, 
    deleteAdminHandler, 
    getAdminByIdHandler,
} = require("../handlers/adminHandler");
const adminRouter = Router();

// GET;
adminRouter.get("/", getAdminHandler);
adminRouter.get("/:id", getAdminByIdHandler);
// POST;
adminRouter.post("/create", postAdminHandler);
// DELETE;
adminRouter.delete("/delete/:id", deleteAdminHandler);

module.exports = adminRouter;