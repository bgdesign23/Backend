const { Admin, User } = require("../../db");
const userJson = require("../../utils/json/users.json");

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

// Eliminar un administrador;
const deleteAdminController = async (id) => {
    if (id) {
        const data = await Admin.destroy({ where: {
            id: id
        }});
        return true;
    } else return false;
};

module.exports = {
    getAdminController,
    postAdminController,
    getAdminByIdController,
    deleteAdminController,
}