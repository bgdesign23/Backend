const {
  registerUser_Controller,
  loginUser_Controller,
} = require("../controllers/users/usersController.js");

const registerUser_Handler = async (req, res) => {
  const { username, phone, location, email, password } = req.body;
  const image = req.files.image[0].path;
  try {
    const result = await registerUser_Controller(
      username,
      phone,
      location,
      email,
      password,
      image
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
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser_Handler,
  loginUser_Handler,
};
