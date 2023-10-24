const { User, Product, Category } = require("../src/db.js");
const usersJson = require("../json/users.json");
const categoriesJson = require("../json/categories.json");
const productsJson = require("../json/products.json");

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
          oferr: products[i].oferr
        });
      }
    }
    console.log("Products filled successfully");
  } catch (error) {
    console.error("Error during fill products: ", error);
  }
};

module.exports = { fillUsers, fillCategories, fillProducts };
