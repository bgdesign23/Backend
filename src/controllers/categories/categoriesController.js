const { Category } = require("../../db");
const categoriesJson = require("../../../json/categories.json");
const { Op } = require("sequelize");

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

const createCategory_Controller = async (data) => {
  try {
    const found = await Category.findOne({
      where: {
        name: {
          [Op.iLike]: `%${data.name.toLowerCase()}%`,
        },
      },
    });

    if (found) {
      throw new Error("esa categoria ya existe");
    }

    const lastCategory = await Category.findOne({
      order: [["id", "DESC"]],
    });

    let newCategoryId = 1;
    if (lastCategory) {
      newCategoryId = lastCategory.id + 1;
    }
    const categoryObj = {
      id: newCategoryId,
      name: data.name.toLowerCase(),
    };

    const newCategory = await Category.create(categoryObj);

    return newCategory; // Devuelve la categoría creada sin enviar respuesta
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getCategories_Controller,
  createCategory_Controller,
};
