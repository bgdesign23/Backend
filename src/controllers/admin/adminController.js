const { Admin, User, Offer } = require("../../db");
const userJson = require("../../utils/json/users.json");
const { Op } = require("sequelize");
const { bcrypt, saltRounds } = require("../../middlewares/bcrypt");

// Trae a los admins;
const getAdminController = async () => {
    try {
        const adminFound = await Admin.findAll();
        if (adminFound.length) return adminFound;
        const adminDb = await Admin.bulkCreate(userJson.users);
        return adminDb; 
    } catch (error) {
        throw new Error(error.message);
    };
};

// Crear un nuevo administrados;
const postAdminController = async (data) => {
    try {
        const findAdmin = await Admin.findOne({
            where: {
                username: data.username,
                phone: data.phone,
                location: data.location,
                email: data.email,
                password: data.password,
                role: data.role,
            },
        });
        if(findAdmin) return res.status(302).json( { message: "este admin ya existe"} );
        
        // Crea el objeto del admin con todos sus datos;
        const adminObj = {
            username: data.username,
            phone: data.phone,
            location: data.location,
            email: data.email,
            password: data.password,
            role: data.role,
        };

        // Crea el nuevo admin en la BDD;
        const newAdmin = await Admin.create(adminObj);
        return newAdmin;
    } catch (error) {
        throw new Error(error.message);
    };
};

// Busqueda por ID;
const getAdminByIdController = async (id) => {
   const adm = await Admin.findByPk(id);
   if(!adm) throw new Error ("Administrador no encontrado");
   return adm; 
};

// Almacena los admins eliminados;
const eliminatedAdminController = async () => {
    const eliminatedAdmin = await Admin.findAll({ paranoid: false, where: { deletedAt: { [Op.not]: null } } });
    if (!eliminatedAdmin || eliminatedAdmin.length === 0) {
      return { message: "No se encontraron administradores eliminados" };
    }
    return eliminatedAdmin;
  };

// Eliminar un administrador;
const deleteAdminController = async (id) => {
  const admin = await Admin.findByPk(id);
  if (!admin) throw new Error("No se encontró el administrador a eliminar");
  await admin.destroy();
  return { message: "Administrador eliminado exitosamente" };
};

// Restaurar un admin;
const restoreAdminController = async (id) => {
    const adm = await Admin.findByPk(id, { paranoid: false });
    if (!adm) throw new Error("No se encontró el admin a restaurar");
    await adm.restore();
    return { message: "Admin restaurado con éxito", adm };      
};

// Modificar un admin;
const updateAdminController = async (
    username,
    phone,
    location,
    email,
    password,
    id,
) => {
    try {
        if (!id) throw new Error("El servidor no recibió el ID necesario");
        const foundAdmin = await Admin.findOne({ where: { id: id } }); 
        if (password !== undefined) {
            const newPassword = password;
            await foundAdmin.update({ password: newPassword });
          } 
          if (username !== undefined) await foundAdmin.update({ username: username });
          if (phone !== undefined) await foundAdmin.update({ phone: phone });
          if (location !== undefined) await foundAdmin.update({ location: location });
          if (email !== undefined) await foundAdmin.update({ email: email });

          const admUpdated = await Admin.findOne({ where: { id: id } });
          if (!admUpdated) throw new Error("No se encontró el administrador actualizado");
          return admUpdated;
    } catch (error) {
        throw new Error(error.message);
    };
};

module.exports = {
    getAdminController,
    postAdminController,
    getAdminByIdController,
    deleteAdminController,
    restoreAdminController,
    updateAdminController,
    eliminatedAdminController,
}