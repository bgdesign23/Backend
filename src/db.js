//Data base confi
require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const pg = require("pg");
const path = require("path");
const { DB_URL } = process.env;

//conecting DataBase with our user Postgres//check file .env
const sequelize = new Sequelize(DB_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
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

// this works to read all models defined in models folder, require and add to modelDefiners array
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// match conection with each model
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// in sequelize.models there are all models imported as properties
// to relate we do a destructuring

const { Product, Category, User, Offer } = sequelize.models;

// Here the relationships would come
// Product.hasMany(Reviews);

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



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
