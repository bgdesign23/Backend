//server and Db synchronization
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = 3001;
const {
  fillUsers,
  fillCategories,
  fillProducts,
} = require("./utils/fillDB.js");

// Syncing all the models at once.//configuracion inicial
conn.sync({ alter: true }).then(() => {
  console.log("Database connected");
  server.listen(PORT, async () => {
    await Promise.all([fillUsers(), fillCategories(), fillProducts()]);
    console.log(`server listening at ${PORT}`); // eslint-disable-line no-console
  });
});
