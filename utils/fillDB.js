const { User, Product, Category, Design } = require("../src/db.js");
const usersJson = require("../json/users.json");
const categoriesJson = require("../json/categories.json");
const productsJson = require("../json/products.json");
const designsJson = require("../json/designs.json");

const fillUsers = async () => {
  try {
    let allUsers = await User.findAll();

    if (!allUsers.length) {
      let newUsers = usersJson.users;

      for (let i = 0; i < newUsers.length; i++) {
        await User.create({
          id: newUsers[i].id,
          username: newUsers[i].username,
          phone: newUsers[i].phone,
          location: newUsers[i].location,
          email: newUsers[i].email,
          password: newUsers[i].password,
          role: newUsers[i].role,
        });
      }
    }
    console.log("Users filled successfully");
  } catch (error) {
    console.error("Error during fill users: ", error);
  }
};

const fillCategories = async () => {
  try {
    let allCategories = await Category.findAll();

    if (!allCategories.length) {
      let categories = categoriesJson.categories;

      categories = categories.map((el, index) => {
        return { id: index + 1, name: el };
      });

      await Category.bulkCreate(categories);
    }
    console.log("Categories filled successfully");
  } catch (error) {
    console.error("Error during fill categories: ", error);
  }
};

const fillProducts = async () => {
  try {
    let allProducts = await Product.findAll();

    if (!allProducts.length) {
      let products = productsJson.products;

      for (let i = 0; i < products.length; i++) {
        await Product.create({
          id: products[i].id,
          name: products[i].name,
          description: products[i].description,
          type: products[i].type,
          material: products[i].material,
          price: products[i].price,
          stock: products[i].stock,
          image: products[i].image,
          color: products[i].color,
          offer: products[i].offer,
          hashtag: products[i].hashtag,
        });
      }
    }
    console.log("Products filled successfully");
  } catch (error) {
    console.error("Error during fill products: ", error);
  }
};

const setCategories = async () => {
  try {
    let products = productsJson.products;
    for (let i = 0; i < products.length; i++) {
      let foundProduct = await Product.findOne({
        where: { id: products[i].id },
      });
      let foundCategory = await Category.findOne({
        where: { id: products[i].CategoryId },
      });
      await foundProduct.setCategory(foundCategory);
    }
    console.log("Categories set successfully");
  } catch (error) {
    console.error("Error during set categories: ", error);
  }
};

const fillDesigns = async () => {
  try {
    let allDesigns = await Design.findAll();

    if (!allDesigns.length) {
      let designs = designsJson.designs;

      for (let i = 0; i < designs.length; i++) {
        await Design.create({
          name: designs[i].name,
          description: designs[i].description,
          type: designs[i].type,
          image: designs[i].image,
        });
      }
    }
    console.log("Designs filled successfully");
  } catch (error) {
    console.error("Error during fill designs: ", error);
  }
};

module.exports = { fillUsers, fillCategories, fillProducts, setCategories, fillDesigns };
