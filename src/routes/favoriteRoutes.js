const { Router } = require("express");
const { 
    postFavoriteHandler,
    deleteFavHandler,
    getFavHandler
 } = require ("../handlers/favoriteHandler");
const favoriteRouter = Router();

// POST;
favoriteRouter.post("/", postFavoriteHandler);
// DELETE;
favoriteRouter.delete("/:id", deleteFavHandler);
//GET
favoriteRouter.get("/:id", getFavHandler)

module.exports = favoriteRouter;
