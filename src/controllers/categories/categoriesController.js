const { Category } = require("../../db");
const categoriesJson = require("../../../json/categories.json");

const getCategories_Controller = async () => {
  try {
    const cat_Found = await Category.findAll();
    if (cat_Found.length) return cat_Found;
    const cat_Db = await Category.bulkCreate(categoriesJson.categories);
    return cat_Db;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getCategories_Controller,
};
