const { Router } = require("express");
const { createOrder } = require("../handlers/pasarelaPagosHandler");

const pasarelaPagos_Router = Router();

pasarelaPagos_Router.get("/success", (req, res) => res.send("Success"));
pasarelaPagos_Router.get("/failure", (req, res) => res.send("Fail"));
pasarelaPagos_Router.get("/pending", (req, res) => res.send("Pending..."));

pasarelaPagos_Router.post("/create-order", createOrder);
pasarelaPagos_Router.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

module.exports = pasarelaPagos_Router;
