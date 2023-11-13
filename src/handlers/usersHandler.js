const dotenv = require("dotenv");
dotenv.config();
const {
  registerUser_Controller,
  loginUser_Controller,
  getUser_Controller,
  getAllUsers_Controller,
  getUserByUsername_Controller,
  getUserById_Controller,
  deleteUser_Controller,
  restoreUser_Controller,
  updateUser_Controller,
  googleUser_Controller,
  eliminatedUsers_Controller,
  requestPasswordResetUser_Controller,
  confirmPasswordResetUser_Controller,
} = require("../controllers/users/usersController.js");
const {
  FRONT_URL,
} = require("../utils/toggleUrl.js");

const registerUser_Handler = async (req, res) => {
  const { username, phone, location, email, password } = req.body;
  const image = typeof req.file === "object" ? req.file.path : req.body.image;
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
    return res.status(400).json({
      error: error.message,
      authenticated: false,
      token: null,
      user: null,
    });
  }
};

const getUser_Handler = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = await getUser_Controller(token);
    if (!user) throw new Error("Error al obtener la información del usuario");
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

const getAllUsers_Handler = async (req, res) => {
  try {
    const users = await getAllUsers_Controller();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getUserByUsername_Handler = async (req, res) => {
  const { username } = req.query;
  try {
    if (!username) throw new Error("No se ingresó un nombre de usuario");
    const searchByName = await getUserByUsername_Controller(username);
    res.status(200).json(searchByName);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById_Handler = async (req, res) => {
  const { id } = req.params;
  try {
    const userById = await getUserById_Controller(id);
    res.status(200).json(userById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser_Handler = async (req, res) => {
  const { id } = req.params;
  try {
    const userDeleted = await deleteUser_Controller(id);
    res.status(200).json(userDeleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminatedUsers_Handler = async (req, res) => {
  try {
    const usersEliminated = await eliminatedUsers_Controller();
    res.status(200).json(usersEliminated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restoreUser_Handler = async (req, res) => {
  const { id } = req.params;
  try {
    const userRestored = await restoreUser_Controller(id);
    res.status(200).json(userRestored);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser_Handler = async (req, res) => {
  const token = req.headers.authorization;
  const { username, phone, location, email } = req.body;
  const password = req.body.newPassword
  const image = typeof req.file === "object" ? req.file.path : req.body.image;
  try {
    const result = await updateUser_Controller(
      username,
      phone,
      location,
      email,
      password,
      image,
      token
    );
    if (!result) throw new Error("El usuario no pudo actualizarse");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const googleUser_Handler = async (req, res) => {
  try {
    const result = await googleUser_Controller(req.user);
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function() {
              window.opener.postMessage({type: 'AUTH_SUCCESS', payload: ${JSON.stringify(
                result
              )}}, '${FRONT_URL}');
              window.close();
            };
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function() {
              window.opener.postMessage({type: 'AUTH_ERROR', payload: ${JSON.stringify(
                {
                  error: error.message,
                  authenticated: false,
                  token: null,
                  user: null,
                }
              )}}, '${FRONT_URL}');
              window.close();
            };
          </script>
        </body>
      </html>
    `);
  }
};

const requestPasswordResetUser_Handler = async (req, res) => {
	const email = req.body.value;
	try {
		const result = await requestPasswordResetUser_Controller(email);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message, message: null });
	}
};

const confirmPasswordResetUser_Handler = async (req, res) => {
	const token = req.body.password;
	const password = req.body.token;
	try {
		const result = await confirmPasswordResetUser_Controller(token, password);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ error: error.message, message: null });
	}
};

module.exports = {
  registerUser_Handler,
  loginUser_Handler,
  getUser_Handler,
  getAllUsers_Handler,
  getUserByUsername_Handler,
  getUserById_Handler,
  deleteUser_Handler,
  restoreUser_Handler,
  updateUser_Handler,
  googleUser_Handler,
  eliminatedUsers_Handler,
  requestPasswordResetUser_Handler,
  confirmPasswordResetUser_Handler,
};
