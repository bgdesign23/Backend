const { User } = require("../../db.js");
const { signToken, verifyToken } = require("../../middlewares/jwt.js");
const { bcrypt, saltRounds } = require("../../middlewares/bcrypt.js");
const { emailSuccessfulRegistration } = require("../../utils/nodemailer/emails.js");

const registerUser_Controller = async (
  username,
  phone,
  location,
  email,
  password,
  image
) => {
  try {
    if (!username || !phone || !location || !email || !password)
      throw new Error("Falta información requerida");

    if (!/\S+@\S+\.\S+/.test(email)) throw new Error("Email inválido");

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) throw new Error("Ya existe un usuario con ese correo");

    if (image === "") {
      image =
        "https://i.imgur.com/veqwMvk.jpg";
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username: username,
      phone: phone,
      location: location,
      email: email,
      password: hashedPassword,
      image: image
    });

    const token = await signToken(
      { user: newUser.dataValues },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    await emailSuccessfulRegistration(
      { username: newUser.username, email: newUser.email },
      token
    );

    return {
      error: null,
      authenticated: true,
      user: newUser,
      token: token,
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

    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) throw new Error("Usuario no encontrado");

    const comparePassword = await bcrypt.compare(password, foundUser.password);
  if (!comparePassword) throw new Error("Contraseña incorrecta");

    const objUser = {
      id: foundUser.id,
      username: foundUser.username,
      phone: foundUser.phone,
      location: foundUser.location,
      email: foundUser.email,
      password: foundUser.password,
      image: foundUser.image,
      role: foundUser.role,
    };

    const token = await signToken({user: foundUser.dataValues}, process.env.JWT_SECRET, {expiresIn: '24h'})

    return {
      error: null,
      authenticated: true,
      user: objUser,
      token: token,
      message: "Logueado con éxito",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUser_Controller = async (token) => {
  
  if(!token) throw new Error('El servidor no recibió el token necesario')

  const decoded = await verifyToken(token, process.env.JWT_SECRET)

  return {
    error: null,
    authenticated: true,
    token: token,
    user: decoded.user,
}
};

module.exports = {
  registerUser_Controller,
  loginUser_Controller,
  getUser_Controller,
};
