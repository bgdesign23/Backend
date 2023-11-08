const { User, Cart, Product } = require("../../db.js");
const { verifyToken } = require("../../middlewares/jwt.js");

const createCart_Controller = async (cart, token) => {
  try {
    if (!token) throw new Error("El servidor no recibió el token necesario");

    const decoded = await verifyToken(token, process.env.JWT_SECRET);
    if (!decoded)
      throw new Error("El token no pertenece al usuario autenticado");

    const existingUser = await User.findOne({ where: { id: decoded.user.id } });
    if (!existingUser)
      throw new Error("No se encuentra el usuario en la base de datos");

    const savedCart = await Cart.findOne({
      where: {
        UserId: existingUser.id,
        status: "saved",
      },
    });

    if (savedCart) {
      await savedCart.destroy();
    }

    const cartArray = JSON.parse(cart[0]);
    if (cartArray.length) {
      for (let i = 0; i < cartArray.length; i++) {
        const foundProduct = await Product.findOne({
          where: { id: cartArray[i].id },
        });
        const newStock = foundProduct.stock - cartArray[i].amount;
        await foundProduct.update({ stock: newStock });
      }
    }

    const newCart = await Cart.create({
      products: cart,
      status: "success",
    });
    await newCart.setUser(existingUser);

    return {
      error: null,
      cart: newCart,
      token: token,
      message: "Carrito creado con éxito",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const saveCart_Controller = async (cart, token) => {
  try {
    if (!token) throw new Error("El servidor no recibió el token necesario");

    const decoded = await verifyToken(token, process.env.JWT_SECRET);
    if (!decoded)
      throw new Error("El token no pertenece al usuario autenticado");

    const existingUser = await User.findOne({ where: { id: decoded.user.id } });
    if (!existingUser)
      throw new Error("No se encuentra el usuario en la base de datos");

    const findCart = await Cart.findOne({
      where: {
        UserId: decoded.user.id,
        status: "saved",
      },
    });

    if (
      !findCart &&
      (cart[0] == null || JSON.stringify(cart) === JSON.stringify(["[]"]))
    ) {
      return { error: null, message: "Nada para guardar" };
    }

    if (findCart && JSON.stringify(cart) === JSON.stringify(["[]"]))
      await findCart.destroy();

    if (!findCart) {
      const saveCart = await Cart.create({
        products: cart,
        status: "saved",
      });
      await saveCart.setUser(existingUser);
    }

    return {
      error: null,
      message: "Carrito guardado con éxito",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCart_Controller,
  saveCart_Controller,
};
