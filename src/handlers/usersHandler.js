const {
  registerUser_Controller,
  loginUser_Controller,
  getUser_Controller,
} = require("../controllers/users/usersController.js");

const registerUser_Handler = async (req, res) => {
  const { username, phone, location, email, password } = req.body;
  const image = typeof req.file === 'object' ? req.file.path : req.body.image;
  try {
    const result = await registerUser_Controller(
      username,
      phone,
      location,
      email,
      password,
      image,
    );
    if (!result) throw new Error("El usuario no pudo crearse");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const loginUser_Handler = async (req, res) => {
  let { email, password } = req.body;
  try {
    const result = await loginUser_Controller(email, password);
    if (!result) throw new Error("No pudo loguearse");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message,
      authenticated: false,
      token: null,
      user: null, });
  }
};

const getUser_Handler = async (req, res) => {
  const token = req.headers.authorization;
  try {
      const user = await getUser_Controller(token);
      if (!user) throw new Error("Error al actualizar la información del usuario");
      res.status(200).json(user);
  } catch (error) {
      res.status(401).json({
          error: error.message,
          authenticated: false,
          token: null,
          user: null,
      });
  }
};

module.exports = {
  registerUser_Handler,
  loginUser_Handler,
  getUser_Handler,
};
