const { Router } = require("express");
const {
  payment_Handler,
  createCart_Handler,
  success_Handler,
  failure_Handler,
  saveCart_Handler,
} = require("../handlers/pasarelaPagosHandler");

const pasarelaPagos_Router = Router();

pasarelaPagos_Router.get("/success", success_Handler);
pasarelaPagos_Router.post("/success", createCart_Handler);
pasarelaPagos_Router.post("/save", saveCart_Handler);
pasarelaPagos_Router.get("/failure", failure_Handler);
pasarelaPagos_Router.get("/pending", (req, res) => res.send("Pending..."));

pasarelaPagos_Router.post("/create-order", payment_Handler);
pasarelaPagos_Router.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

module.exports = pasarelaPagos_Router;
