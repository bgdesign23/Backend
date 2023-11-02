const { Router } = require("express");
const {
    createCoupon_Handler,
    getCouponHandler,
    deleteCouponHandler,
} = require ("../handlers/couponHandler");
const couponRouter = Router();

// GET
couponRouter.get("/", getCouponHandler)
// POST
couponRouter.post("/create", createCoupon_Handler);
// DELETE
couponRouter.delete("/delete/:id", deleteCouponHandler);

module.exports = couponRouter;