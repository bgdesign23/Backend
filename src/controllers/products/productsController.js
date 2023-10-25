const { Product, Category } = require("../../db");
const { Op } = require("sequelize");

const getProducts_controller = async () => {
  const data = await Product.findAll();
  //  console.log("que hay", data);
  if (!data.length) {
    throw new Error("did not find products");
  }
  return data;
};

const getProducts_By_Id_Controller = async (id) => {
  try {
    const Prodfound = await Product.findOne({
      where: { id: id },
      // include: {
      //   model: Category,
      //   attributes: ["name"],
      //   through: { attributes: [] },
      // },
    });
    return Prodfound;
  } catch (error) {
    return new Error("this product does not exist");
  }
};

const getProducts_By_Name_Controller = async (name) => {
  try {
    const Prodfound = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name.toLowerCase()}%`, //esta linea es para que no sea escritura estricta
        },
      },
    });
    return Prodfound;
  } catch (error) {
    return new Error("this product does not exist");
  }
};

const createNewProduct_controller = async (data) => {
  try {
    const productObj = {
      name: data.name.toLowerCase(),
      description: data.description,
      type: data.type,
      material: data.material,
      price: data.price,
      stock: data.stock,
      image: data.image,
      color: data.color,
    };
    const newProduct = await Product.create(productObj);

    const catFound = await Category.findOne({
      where: { name: data.CategoryId },
    });
    console.log(catFound);
    await newProduct.setCategory(catFound);
    await newProduct.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const postProduct_Rating_controller = async (id, newRating) => {
  try {
    let product = await Product.findOne({
      where: { id: id },
    });
    if (product) {
      // Actualiza el total de calificaciones y el contador
      product.totalRating += newRating;
      product.ratingCount += 1;

      // Calcula el nuevo promedio de calificaciones
      product.rating =
        product.ratingCount > 0 ? product.totalRating / product.ratingCount : 0;

      // Guarda el producto actualizado en la base de datos
      await product.save();

      product.rating = parseInt(product.rating);

      /* console.log(product); */ // Devuelve el producto actualizado
      return product;
    } else {
      // Maneja el caso en el que el producto no se encuentra
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProducts_controller,
  createNewProduct_controller,
  getProducts_By_Id_Controller,
  getProducts_By_Name_Controller,
  postProduct_Rating_controller,
};
