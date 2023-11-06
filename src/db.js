require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const pg = require("pg");
const path = require("path");
const { DB_URL } = process.env;

const sequelize = new Sequelize(DB_URL, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
  dialect: "postgres",
  protocol: "postgres",
  dialectModule: pg,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Product, Category, User, Offer, Design, Coupon, Cart, UserPasswordReset } = sequelize.models;

Category.hasMany(Product, { as: "products" });
Product.belongsTo(Category, {
  foreignKey: "CategoryId",
  as: "category",
});

User.belongsToMany(Product, { through: "user_product" });
Product.belongsToMany(User, { through: "user_product" });

Product.belongsToMany(Offer, { through: "product_offer" });
Offer.belongsToMany(Product, { through: "product_offer" });

User.hasMany(Offer, { as: "offers" });
Offer.belongsTo(User, {
  foreignKey: "UserId",
  as: "user",
});

User.hasMany(Design, { as: "designs" });
Design.belongsTo(User, {
  foreignKey: "UserId",
  as: "user",
});

User.hasMany(Coupon, { as: "coupons" });
Coupon.belongsTo(User, {
  foreignKey: "UserId",
  as: "user",
});

User.hasMany(Cart, { as: "carts" });
Cart.belongsTo(User, {
  foreignKey: "UserId",
  as: "user",
});

User.hasOne(UserPasswordReset, { foreignKey: 'UserId' });
UserPasswordReset.belongsTo(User, { foreignKey: 'UserId' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
