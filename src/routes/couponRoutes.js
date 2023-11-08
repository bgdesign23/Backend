const { Router } = require("express");
const {
    createCoupon_Handler,
    getCouponHandler,
    deleteCouponHandler,
    restoreCouponHandler,
    updateCouponHandler,
} = require ("../handlers/couponHandler");
const couponRouter = Router();

// GET
couponRouter.get("/", getCouponHandler);
couponRouter.get("/restore/:id", restoreCouponHandler);
// POST
couponRouter.post("/create", createCoupon_Handler);
// PUT
couponRouter.put("/:id", updateCouponHandler);
// DELETE
couponRouter.delete("/delete/:id", deleteCouponHandler);

module.exports = couponRouter;