const {
  getCategories_Controller,
} = require("../controllers/categories/categoriesController");

const getCategories_Handler = async (req, res) => {
  try {
    const categories = await getCategories_Controller();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCategories_Handler,
};
