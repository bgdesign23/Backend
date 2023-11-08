const { Product, Category, Admin } = require("../../db");
const { Op } = require("sequelize");

const getProducts_controller = async () => {
  const data = await Product.findAll({
    include: 
      {
        model: Category,
        attributes: ["name"],
        as: "category",
      },
  });
  if (!data.length) {
    throw new Error("did not find products");
  }
  return data;
};

const getProducts_By_Id_Controller = async (id) => {
  try {
    const Prodfound = await Product.findOne({
      where: { id: id },
      include: {
        model: Category,
        attributes: ["name"],
        as: "category",
      },
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
      include: {
        model: Category,
        attributes: ["name"],
        as: "category",
      },
    });
    return Prodfound;
  } catch (error) {
    return new Error("this product does not exist");
  }
};

const getProducts_By_Hashtag_Controller = async (hashtag) => {
  try {
    const Prodfound = await Product.findAll({
      where: {
        hashtag: {
          [Op.iLike]: `%${hashtag.toLowerCase()}%`,
        },
      },
      include: {
        model: Category,
        attributes: ["name"],
        as: "category",
      },
    });
    return Prodfound;
  } catch (error) {
    return new Error("this product does not exist");
  }
};

const createNewProduct_controller = async (data, image) => {
  try {
    if (image === "") {
      image =
        "https://img.freepik.com/vector-gratis/gradiente-diseno-letrero-foto_23-2149288316.jpg";
    }

    const productObj = {
      name: data.name.toLowerCase(),
      description: data.description,
      type: data.type,
      material: data.material,
      price: data.price,
      stock: data.stock,
      image: image,
      color: data.color,
      amount: data.amount,
    };
    const newProduct = await Product.create(productObj);

    const catFound = await Category.findOne({
      where: { name: data.category },
    });
    if (!catFound) {
      const lastCategory = await Category.findOne({
        order: [["id", "DESC"]],
      });

      let newCategoryId = 1;
      if (lastCategory) {
        newCategoryId = lastCategory.id + 1;
      }
      const categoryObj = {
        id: newCategoryId,
        name: data.category,
      }
      const newCategory = await Category.create(categoryObj);
      await newProduct.setCategory(newCategory);
    } else {
      await newProduct.setCategory(catFound);
    }
    
    // Devolver el producto creado
    return newProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct_Controller = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error("No se encontró el producto a eliminar");
  await product.destroy();
  return { message: "Producto eliminado exitosamente" };
}

const restoreProduct_Controller = async (id) => {
  const product = await Product.findByPk(id, { paranoid: false });
  if (!product) throw new Error("No se encontró el producto a restaurar");
  await product.restore();
  return { message: "Producto restaurado con éxito", product };
};

const updateProduct_Controller = async (
  id,
  name,
  description,
  type,
  material,
  price,
  stock,
  color,
  offer,
  hashtag
) => {
  try {
    if (!id) throw new Error("El servidor no recibió el ID necesario");
    const foundProduct = await Product.findOne({ where: { id: id } }); 
    if (!foundProduct) {
      throw new Error("No se encontró el producto a actualizar");
    }
    if (price !== undefined) {
      const newPrice = price;
      await foundProduct.update({ price: newPrice });
    }
    if (name !== undefined) await foundProduct.update({ name:name });
    if (description !== undefined) await foundProduct.update({ description:description });
    if (type !== undefined) await foundProduct.update({ type:type });
    if (material !== undefined) foundProduct.update({ material:material });
    if (stock !== undefined) foundProduct.update({ stock:stock });
    if (color !== undefined) foundProduct.update({ color:color });
    if (offer !== undefined) foundProduct.update({ offer:offer });
    if (hashtag !== undefined) foundProduct.update({ hashtag:hashtag });

    const productUpdated = await Product.findOne({ where: { id: id }});
    if (!productUpdatedd) throw new Error("No se encontró el producto actualizado");
    return productUpdated; 
  } catch (error) {
    throw new Error(error.message);
  };
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
  deleteProduct_Controller,
  restoreProduct_Controller,
  getProducts_By_Hashtag_Controller,
  updateProduct_Controller,
};
