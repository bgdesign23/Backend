//server and Db synchronization
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3001;
const {
  fillUsers,
  fillCategories,
  fillProducts,
  setCategories
} = require("./utils/fillDB.js");

// Syncing all the models at once.//configuracion inicial
conn.sync({ force: true }).then(() => {
  console.log("Database connected");
  server.listen(PORT, async () => {
    await Promise.all([fillUsers(), fillCategories(), fillProducts()]);
    await Promise.all([setCategories()]);
    console.log(`server listening at ${PORT}`); // eslint-disable-line no-console
  });
});
