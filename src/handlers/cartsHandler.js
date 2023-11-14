const {
  getAllCarts_Controller,
  getByUserCarts_Controller,
  getByIdCarts_Controller,
} = require("../controllers/carts/cartsController.js");

const getAllCarts_Handler = async (req, res) => {
  try {
    const result = await getAllCarts_Controller();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getByUserCarts_Handler = async (req, res) => {
  const { id } = req.params;
  try {
    const carts = await getByUserCarts_Controller(id);
    res.status(200).json(carts);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getByIdCarts_Handler = async (req, res) => {
  let { id } = req.params;
  try {
    const result = await getByIdCarts_Controller(id);
    if (!result) throw new Error("No se encontró el carrito con ese id");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllCarts_Handler,
  getByUserCarts_Handler,
  getByIdCarts_Handler,
};
