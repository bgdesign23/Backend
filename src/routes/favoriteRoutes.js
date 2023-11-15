const { Router } = require("express");
const { 
    postFavoriteHandler,
    deleteFavHandler,
 } = require ("../handlers/favoriteHandler");
const favoriteRouter = Router();

// POST;
favoriteRouter.post("/:id", postFavoriteHandler);
// DELETE;
favoriteRouter.delete("/delete/:id", deleteFavHandler);

module.exports = favoriteRouter;
