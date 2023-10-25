const {
  getCategories_Controller,
  createCategory_Controller
} = require("../controllers/categories/categoriesController");

const getCategories_Handler = async (req, res) => {
  try {
    const categories = await getCategories_Controller();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createCategory_Handler = async (req, res) => {
  try {
    const data = req.body;
    if (!data.name) return res.status(400).json("Missing data");
    console.log(data)
    
    const newCategory = await createCategory_Controller(data);
    return res.status(201).json(newCategory); // Devuelve la categoría creada en el handler
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCategories_Handler,
  createCategory_Handler,
};
