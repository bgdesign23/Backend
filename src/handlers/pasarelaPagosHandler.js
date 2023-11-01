const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();

mercadopago.configure({
  access_Token: process.env.ACCESS_TOKEN,
});

const payment_Handler = async (req, res) => {
  const productsArray = req.body;

  const arrayMap = productsArray.map((product) => {
    return {
      title: product.title,
      description: product.description,
      unit_price: product.price,
      currency_id: "ARS",
      quantity: product.quantity,
    };
  });

  try {
    let preference = {
      items: arrayMap,
      back_urls: {
        success: "http://localhost:3001/success",
        failure: "http://localhost:3001/failure",
        pending: "http://localhost:3001/pending",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = payment_Handler;
