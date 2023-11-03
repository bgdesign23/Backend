const mercadopago = require("mercadopago");
const {
  createCart_Controller,
  saveCart_Controller,
} = require("../controllers/pasarelaPagos/pasarelaPagosController.js");
const {
  BACK_URL,
  FRONT_URL,
} = require("../utils/toggleUrl.js");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const payment_Handler = async (req, res) => {
  const productsArray = req.body;

  const arrayMap = productsArray.map((product) => {
    return {
      title: product.title,
      description: product.description,
      unit_price: product.price,
      currency_id: "ARS",
      quantity: product.amount,
    };
  });

  try {
    let preference = {
      items: arrayMap,
      back_urls: {
        success: `${BACK_URL}/payment/success`,
        failure: `${BACK_URL}/payment/failure`,
        pending: `${BACK_URL}/payment/pending`,
      },
      auto_return: "approved",
    };

    const result = await mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.json({
          id: response.body.id,
        });
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCart_Handler = async (req, res) => {
  const cart = req.body;
  const token = req.headers.authorization;
  try {
    const result = await createCart_Controller(cart, token);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const success_Handler = async (req, res) => {
  try {
    const clean_url = `${FRONT_URL}/home/success`;
    res.redirect(clean_url);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const failure_Handler = async (req, res) => {
  try {
    const clean_url = `${FRONT_URL}/cartShop`;
    res.redirect(clean_url);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const saveCart_Handler = async (req, res) => {
  const cart = req.body;
  const token = req.headers.authorization;
  try {
    const result = await saveCart_Controller(cart, token);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  payment_Handler,
  createCart_Handler,
  success_Handler,
  failure_Handler,
  saveCart_Handler,
};
