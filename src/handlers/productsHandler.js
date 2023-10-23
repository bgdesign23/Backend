const {
  getProducts_controller,
  createNewProduct_controller,
} = require("../controllers/products/productsController");

const { Product } = require("../db");

const getProduct_handler = async (req, res) => {
  try {
    const productos = await getProducts_controller();
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postProduct_handler = async (req, res) => {
  try {
    const data = req.body;
    if (
      !data.name ||
      !data.description ||
      !data.type ||
      !data.material ||
      !data.price ||
      !data.stock ||
      !data.image ||
      !data.color
    )
      return res.status(400).json("missing form data");

    const findProduct = await Product.findOne({
      where: { name: data.name.toLowerCase() },
    });

    if (findProduct)
      return res.status(302).json({ message: "this product already exists" });
    const newProduct = await createNewProduct_controller(data);
    return res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ erorr: error.message });
  }
};

module.exports = {
  getProduct_handler,
  postProduct_handler,
};
