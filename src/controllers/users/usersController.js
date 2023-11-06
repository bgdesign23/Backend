const { User, UserPasswordReset, Cart } = require("../../db.js");
const { signToken, verifyToken } = require("../../middlewares/jwt.js");
const { bcrypt, saltRounds } = require("../../middlewares/bcrypt.js");
const {
  emailSuccessfulRegistration,
  emailSuccessfulUserActulization,
  emailResetPassword,
} = require("../../utils/nodemailer/emails.js");
const { Op } = require("sequelize");
const {
  passwordGenerator,
} = require("../../utils/googleUsers/passwordGenerator.js");

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
      image = "https://i.imgur.com/veqwMvk.jpg";
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username: username,
      phone: phone,
      location: location,
      email: email,
      password: hashedPassword,
      image: image,
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

    const existUser = await User.findOne({ where: { email } });
    if (!existUser) throw new Error("Usuario no encontrado");

    const findUser = await User.findOne({
      where: { email },
      include: {
        model: Cart,
        as: "carts",
        where: {
          status: "saved",
        },
      },
    });

    let foundUser;
    findUser ? (foundUser = findUser) : (foundUser = existUser);

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
      cart: foundUser.carts ? foundUser.carts[0] : [],
    };

    const token = await signToken(
      { user: foundUser.dataValues },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

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
  if (!token) throw new Error("El servidor no recibió el token necesario");

  const decoded = await verifyToken(token, process.env.JWT_SECRET);

  return {
    error: null,
    authenticated: true,
    token: token,
    user: decoded.user,
  };
};

const getAllUsers_Controller = async () => {
  const allUsers = await User.findAll();
  if (!allUsers.length)
    throw new Error("No se encontraron usuarios en la base de datos");
  return allUsers;
};

const getUserByUsername_Controller = async (username) => {
  const users = await User.findAll({
    where: { username: { [Op.iLike]: `%${username}%` } },
  });
  if (!users.length)
    throw new Error("No se encontraron usuarios con ese nombre");
  return users;
};

const getUserById_Controller = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("Usuario no encontrado");
  return user;
};

const deleteUser_Controller = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("No se encontró el usuario a eliminar");
  await user.destroy();
  return { message: "Usuario eliminado correctamente" };
};

const restoreUser_Controller = async (id) => {
  const user = await User.findByPk(id, { paranoid: false });
  if (!user) throw new Error("No se encontró el usuario a restaurar");
  await user.restore();
  return { message: "Usuario restaurado con éxito", user };
};

const updateUser_Controller = async (
  username,
  phone,
  location,
  email,
  password,
  image,
  token
) => {
  try {
    if (!token) throw new Error("El servidor no recibió el token necesario");

    const decoded = await verifyToken(token, process.env.JWT_SECRET);
    if (!decoded)
      throw new Error("El token no pertenece al usuario autenticado");

    const foundUser = await User.findOne({ where: { id: decoded.user.id } });

    if (password !== undefined) {
      const newPassword = password;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
      await foundUser.update({ password: hashedNewPassword });
    }

    if (username !== undefined) await foundUser.update({ username: username });
    if (phone !== undefined) await foundUser.update({ phone: phone });
    if (location !== undefined) await foundUser.update({ location: location });
    if (email !== undefined) await foundUser.update({ email: email });
    if (image !== undefined) await foundUser.update({ image: image });

    const userUpdated = await User.findOne({ where: { id: decoded.user.id } });
    if (!userUpdated) throw new Error("No se encontró el usuario actualizado");

    await emailSuccessfulUserActulization(
      { username: userUpdated.username, email: userUpdated.email },
      token
    );

    return {
      error: null,
      authenticated: true,
      user: userUpdated,
      token: token,
      message: "Usuario actualizado con éxito",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const googleUser_Controller = async (profile) => {
  const googleId = profile.id;
  const username = profile.displayName;
  const email = profile.emails[0].value;
  const image = profile.photos[0].value;

  const findUser = await User.findOne({
    where: { email },
    attributes: { exclude: ["password"] },
  });

  if (findUser) {
    if (findUser.googleId) {
      const token = await signToken(
        { user: findUser.dataValues },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      const findUserGoogle = await User.findOne({
        where: { googleId: findUser.googleId },
        include: {
          model: Cart,
          as: "carts",
          where: {
            status: "saved",
          },
        },
      });

      let foundUser;
      findUserGoogle ? (foundUser = findUserGoogle) : (foundUser = findUser);

      const userGoogle = {
        id: foundUser.id,
        googleId: foundUser.googleId,
        username: foundUser.username,
        email: foundUser.email,
        image: foundUser.image,
        cart: foundUser.carts ? foundUser.carts[0] : [],
      };

      return {
        error: null,
        authenticated: true,
        token: token,
        user: userGoogle,
      };
    } else throw new Error("Ya existe un usuario con ese correo"); // Acá podemos poner para que se verifique en el gmail y se fusionen el gmail registrado sin google con el que se está registrando con google
  } else {
    const hashedPassword = await bcrypt.hash(passwordGenerator(), saltRounds);
    const newUser = await User.create({
      googleId: googleId,
      username: username,
      phone: "Sin especificar",
      location: "Sin especificar",
      email: email,
      password: hashedPassword,
      image: image,
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

    const userData = await User.findOne({ where: { id: newUser.id } });

    return {
      error: null,
      authenticated: true,
      token: token,
      user: {
        id: userData.id,
        googleId: userData.googleId,
        username: userData.username,
        email: userData.email,
        image: userData.image,
        role: userData.role,
      },
    };
  }
};

const requestPasswordResetUser_Controller = async (email) => {
  if (!email) throw new Error("Se requiere un correo electrónico.");
  if (!/\S+@\S+\.\S+/.test(email))
    throw new Error("Ingresa un correo electrónico válido.");

  const findUser = await User.findOne({ where: { email: email } });
  if (!findUser)
    throw new Error(
      "Lo sentimos. No pudimos identificarte con la información provista."
    );

  if (findUser.googleId) {
    return {
      error: null,
      message: "Redirigiendo a Google...",
      redirectUrl: "https://accounts.google.com/",
    };
  }

  const token = await signToken(
    { user: { id: findUser.id, email: findUser.email } },
    process.env.JWT_SECRET,
    { expiresIn: "900000" }
  );

  await UserPasswordReset.create({
    token: token,
    UserId: findUser.id,
  });

  await emailResetPassword(
    { username: findUser.username, email: findUser.email },
    token
  );

  return {
    error: null,
    message:
      "Has solicitado restablecer tu contraseña. Verifica tu correo electrónico.",
  };
};

const confirmPasswordResetUser_Controller = async (token, password) => {
  if (!token || !password)
    throw new Error("Se requiere un token y una contraseña.");
  const decoded = await verifyToken(token, process.env.JWT_SECRET);
  const findUserPasswordReset = await UserPasswordReset.findOne({
    where: { token: token, UserId: decoded.user.id },
  });
  if (!findUserPasswordReset)
    throw new Error(
      "No se encontró ninguna solicitud para restablecer la contraseña con este token."
    );

  const findUser = User.findOne({
    where: { id: decoded.user.id, email: decoded.user.email },
  });
  if (!findUser)
    throw new Error(
      "No se encontró ninguna solicitud para restablecer la contraseña con este token."
    );

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await User.update(
    { password: hashedPassword },
    { where: { id: decoded.user.id, email: decoded.user.email } }
  );
  await findUserPasswordReset.destroy();

  return {
    error: null,
    message: "Se restableció la contraseña exitosamente.",
  };
};

module.exports = {
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
  requestPasswordResetUser_Controller,
  confirmPasswordResetUser_Controller,
};
