const { User } = require("../../db.js");

const registerUser_Controller = async (
  username,
  phone,
  location,
  email,
  password
) => {
  try {
    if (!username || !phone || !location || !email || !password)
      throw new Error("Falta información requerida");

    if (!/\S+@\S+\.\S+/.test(email)) throw new Error("Email inválido");

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) throw new Error("Ya existe un usuario con ese correo");
    const newUser = await User.create({
      username: username,
      phone: phone,
      location: location,
      email: email,
      password: password,
    });
    return {
      user: newUser,
      message: "Usuario creado con éxito",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser_Controller = async (email, password) => {
  try {
    if (!email || !password) throw new Error("Falta información requerida");
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error("Email inválido");

    const findUser = await User.findOne({ where: { email } });
    if (!findUser) throw new Error("Usuario no encontrado");

    const objUser = {
      id: findUser.id,
      username: findUser.username,
      phone: findUser.phone,
      location: findUser.location,
      email: findUser.email,
      password: findUser.password,
    };

    return {
      user: objUser,
      message: "Logueado con éxito",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  registerUser_Controller,
  loginUser_Controller,
};
