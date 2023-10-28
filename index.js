process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//server and Db synchronization
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3001;
const {
  fillUsers,
  fillCategories,
  fillProducts,
  setCategories,
  fillDesigns
} = require("./src/utils/fillDB.js");

// Syncing all the models at once.//configuracion inicial
conn.sync({ alter: true }).then(() => {
  console.log("Database connected");
  server.listen(PORT, async () => {
    await Promise.all([fillUsers(), fillCategories(), fillProducts(), fillDesigns()]);
    await Promise.all([setCategories()]);
    console.log(`Server listening at ${PORT}`); // eslint-disable-line no-console
  });
});
