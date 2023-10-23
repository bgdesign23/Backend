const { Product } = require("../db");

const getProducts_controller = async () => {
  if (!data.length) {
    throw new Error("did not find products");
  } else {
    const data = await Product.findAll();
    return data;
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
    // await newProduct.addCategory(data.Category);
    await newProduct.save();
    const productCreated = await Pokemon.findOne({
      where: { name: newProduct.name },
      include: {
        model: category,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    return productCreated;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getProducts_controller,
  createNewProduct_controller,
};
