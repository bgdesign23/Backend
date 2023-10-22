//server and Db synchronization
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = 3001;

// Syncing all the models at once.//configuracion inicial
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`server listening at ${PORT}`); // eslint-disable-line no-console
  });
});
