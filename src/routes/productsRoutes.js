const { Router } = require("express");
// const {
//   getPokemonHandler,
//   getPokemonById_Handler,
//   postPokemonHandler,
//   deletePokemon_Handler,
//   getPokemonByName_handler,
// } = require("../handlers/pokemonHandler");
const prodRouter = Router();

prodRouter.get("/", "handlers");
prodRouter.get("/:id");
prodRouter.get("/nav/:name");
prodRouter.post("/create");
prodRouter.delete("/delete/:id");

module.exports = prodRouter;
