const { Router } = require("express");
const {
  createCoupon_Handler,
  getCouponHandler,
  deleteCouponHandler,
  restoreCouponHandler,
  updateCouponHandler,
  eliminatedCouponHandler,
} = require("../handlers/couponHandler");
const couponRouter = Router();

// GET
couponRouter.get("/", getCouponHandler);
couponRouter.put("/restore/:id", restoreCouponHandler);
couponRouter.get("/eliminated", eliminatedCouponHandler);
// POST
couponRouter.post("/create", createCoupon_Handler);
// PUT
couponRouter.put("/:id", updateCouponHandler);
// DELETE
couponRouter.delete("/delete/:id", deleteCouponHandler);

module.exports = couponRouter;
