const { Product, Category } = require("../../db");

const getProducts_controller = async () => {
  const  data  = await Product.findAll();
  //  console.log("que hay", data);
  if (!data.length) {
    throw new Error("did not find products");
  }
  return data;
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
    // const productCreated = await Product.findOne({
    //   where: { name: newProduct.name },
    //   include: {
    //     model: Category,
    //     attributes: ["name"],
    //     through: { attributes: [] },
    //   },
    // });
    // return productCreated;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getProducts_controller,
  createNewProduct_controller,
};
