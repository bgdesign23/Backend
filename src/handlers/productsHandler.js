const {
  getProducts_controller,
  createNewProduct_controller,
  getProducts_By_Id_Controller,
  getProducts_By_Name_Controller,
  postProduct_Rating_controller,
  deleteProduct_Controller,
  getProducts_By_Hashtag_Controller,
  restoreProduct_Controller,
  eliminatedProducts_Controller,
  updateProduct_Controller,
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

const getProduct_ById_handler = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await getProducts_By_Id_Controller(id);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getProduct_ByName_handler = async (req, res) => {
  try {
    const { name } = req.params;
    const producto = await getProducts_By_Name_Controller(name);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getProduct_ByHashtag_handler = async (req, res) => {
  try {
    const { hashtag } = req.params;
    console.log(hashtag);
    const producto = await getProducts_By_Hashtag_Controller(hashtag);
    return res.status(200).json(producto);
  } catch (error) {
    // return res.status(400).json({ error: error.message });
    console.log("no anda el handler");
  }
};

const postProduct_handler = async (req, res) => {
  try {
    const data = req.body;
    const image = typeof req.file === 'object' ? req.file.path : req.body.image;
    if (
      !data.category ||
      !data.name ||
      !data.description ||
      !data.type ||
      !data.material ||
      !data.price ||
      !data.stock ||
      !data.color
    )
      return res.status(400).json({ message: "Falta información requerida" });

    const findProduct = await Product.findOne({
      where: { name: data.name.toLowerCase() },
    });

    if (findProduct)
      return res.status(302).json({ message: "Ya existe un producto con ese nombre" });
    
    const newProduct = await createNewProduct_controller(data, image);
    
    // Enviar el producto creado en la respuesta
    return res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteProduct_handler = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await deleteProduct_Controller(id);
    return res.status(200).json(deleteProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const eliminatedProducts_Handler = async (req, res) => {
  try {
    const productsEliminated = await eliminatedProducts_Controller();
    return res.status(200).json(productsEliminated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const restoreProduct_handler = async (req, res) => {
  const { id } = req.params;
  try {
    const restoreProduct = await restoreProduct_Controller(id);
    return res.status(200).json(restoreProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postProduct_Rating_Handler = async (req, res) => {
  try {
    const { id } = req.params;
    const { newRating, comment, userId } = req.body;
    const review = await postProduct_Rating_controller(id, newRating, comment, userId);
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProduct_Handler = async (req, res) => {
  const { name, type, description, color, material, stock, offer, hashtag } = req.body;
  const id = req.params.id; 
  const price = req.body.newPrice;
  try {
    const response = await updateProduct_Controller(
      id,
      name,
      type,
      description,
      color,
      material,
      stock,
      price,
      offer,
      hashtag,
    )
    if(!response) throw new Error ("El producto no pudo actualizarse");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  };
};

module.exports = {
  getProduct_handler,
  postProduct_handler,
  getProduct_ById_handler,
  getProduct_ByName_handler,
  deleteProduct_handler,
  postProduct_Rating_Handler,
  restoreProduct_handler,
  eliminatedProducts_Handler,
  getProduct_ByHashtag_handler,
  updateProduct_Handler
};
