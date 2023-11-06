const { Cart } = require("../../db.js");

const getAllCarts_Controller = async () => {
  const data = await Cart.findAll();
  if (!data.length) {
    throw new Error("No se encontraron carritos");
  }
  return data;
};

const getByUserCarts_Controller = async (UserId) => {
  if (!UserId) throw new Error("El servidor no recibió el id de usuario necesario");
  const foundCarts = await Cart.findAll({where: {UserId}});
  return {
    error: null,
    carts: foundCarts,
  };
};

const getByIdCarts_Controller = async (id) => {
  if (!id) throw new Error("Falta el id de carrito requerido");

  const foundCart = await Cart.findOne({ where: { id } });
  if (!foundCart) throw new Error(`Carrito con id ${id} no encontrado`);

  return foundCart
};

module.exports = {
  getAllCarts_Controller,
  getByUserCarts_Controller,
  getByIdCarts_Controller,
};
