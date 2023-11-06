const { Admin } = require ("../db");
const {
    getAdminController,
    postAdminController,
    getAdminByIdController,
    deleteAdminController,
} = require("../controllers/admin/adminController");

// Obtenemos todos los admins;
const getAdminHandler = async (req, res) => {
    try {
        const admin = await getAdminController();
        return res.status(200).json(admin);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};

// Crea el nuevo administrador;
const postAdminHandler = async (req, res) => {
    try {
        const data = req.body;
        const { id } = req.params;

        if (
            !data.username ||
            !data.phone ||
            !data.location ||
            !data.email ||
            !data.password ||
            !data.role
        ) {
            return res.status(400).json({ error: "Faltan completar datos" }); 
        }
        if (!/\S+@\S+\.\S+/.test(data.email)) throw new Error("Email inválido");

        const existingAdmin = await Admin.findOne({ where: { email: data.email } });
    
        if (existingAdmin) throw new Error("Ya existe un admin con ese correo");

        const adm = await postAdminController(data, id);
        return res.status(201).json(adm);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};

// Busqueda por ID;
const getAdminByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const administrador = await getAdminByIdController(id);
        return res.status(200).json(administrador);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};

// Eliminar un administrados;
const deleteAdminHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteAdminController(id);
        if(response) {
            return res.status(200).json("Delete Succesfully"); 
        } else return res.status(404).json("Admin not found");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
};

module.exports = {
    getAdminHandler,
    postAdminHandler,
    getAdminByIdHandler,
    deleteAdminHandler,
}