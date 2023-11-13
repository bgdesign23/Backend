process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3001;
const {
  fillUsers,
  fillCategories,
  fillProducts,
  setCategories,
  fillDesigns,
} = require("./src/utils/fillDB.js");

conn.sync({ alter: false }).then(() => {
  console.log("Database connected");
  server.listen(PORT, async () => {
    await Promise.all([
      fillUsers(),
      fillCategories(),
      fillProducts(),
      fillDesigns(),
    ]);
    await Promise.all([setCategories()]);
    console.log(`Server listening at ${PORT}`);
  });
});
