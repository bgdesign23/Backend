const { Product, Category, Admin, User, Cart } = require("../../db");
const { Op } = require("sequelize");
const { emailReview } = require("../../utils/nodemailer/emails");

const getProducts_controller = async () => {
  const data = await Product.findAll({
    include: {
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
      };
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
};

const eliminatedProducts_Controller = async () => {
  const eliminatedProducts = await Product.findAll({ paranoid: false, where: { deletedAt: { [Op.not]: null } } });
  if (!eliminatedProducts || eliminatedProducts.length === 0) {
    return { message: "No se encontraron productos eliminados" };
  }
  return eliminatedProducts;
};

const restoreProduct_Controller = async (id) => {
  const product = await Product.findByPk(id, { paranoid: false });
  if (!product) throw new Error("No se encontró el producto a restaurar");
  await product.restore();
  return { message: "Producto restaurado con éxito", product };
};

// Modifica un producto;
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
    if (name !== undefined) {
      await foundProduct.update({ name: name });
    }
    if (description !== undefined) {
      await foundProduct.update({ description: description });
    }
    if (type !== undefined) {
      await foundProduct.update({ type: type });
    }
    if (material !== undefined && typeof material === 'string') {
      await foundProduct.update({ material: material });
    }
    if (price !== undefined && !isNaN(parseFloat(price))) {
      const newPrice = parseFloat(price);
      await foundProduct.update({ price: newPrice });
    }
    if (stock !== undefined) {
      await foundProduct.update({ stock: stock });
    }
    if (color !== undefined) {
      await foundProduct.update({ color: color });
    }
    if (offer !== undefined) {
      await foundProduct.update({ offer: offer });
    }
    if (hashtag !== undefined) {
      await foundProduct.update({ hashtag: hashtag });
    }
    // Obtener el producto actualizado
    const productUpdated = await Product.findOne({ where: { id: id } });
    if (!productUpdated) {
      throw new Error("No se encontró el producto actualizado");
    }

    return productUpdated;
  } catch (error) {
    throw new Error(error.message);
  }
};

const postProduct_Rating_controller = async (
  id,
  newRating,
  comment,
  userId
) => {
  try {
    let user = await User.findOne({ where: { id: userId } });

    const getCarts = await Cart.findAll({
      where: {
        UserId: userId,
        status: "success",
      },
    });

    const findProductInCarts = (id) => {
      for (const cart of getCarts) {
        for (const product of cart.products) {
          const parsedProduct = JSON.parse(product);
          for (let i = 0; i < parsedProduct.length; i++) {
            if (parsedProduct[i].id == id) {
              return true;
            }
          }
        }
      }
      return false;
    };

    const productInCart = findProductInCarts(id);

    if (productInCart) {
      let product = await Product.findOne({
        where: { id: id },
      });

      if (product) {
        product.totalRating += newRating;
        product.ratingCount += 1;
        product.rating =
          product.ratingCount > 0
            ? product.totalRating / product.ratingCount
            : 0;
            
        const generateStarRating = (newRating) => {
          return (stars = "⭐️".repeat(newRating));
        };

        const starRatingText = generateStarRating(newRating);
        product.comments = [
          ...product.comments,
          `${user.username} ${starRatingText}: ${comment}`,
        ];

        await product.save();

        product.rating = parseInt(product.rating);

        await emailReview(
          { username: user.username, email: user.email },
          { rating: newRating },
          { comment: comment },
          { product: product.name }
        );

        return product;
      } else {
        throw new Error("Producto no encontrado");
      }
    } else {
      throw new Error("El usuario no compró el producto");
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
  eliminatedProducts_Controller,
  getProducts_By_Hashtag_Controller,
  updateProduct_Controller,
};
