const { Router } = require("express");
const { 
    postFavoriteHandler,
    deleteFavHandler,
    getFavHandler
 } = require ("../handlers/favoriteHandler");
const favoriteRouter = Router();

// POST;
favoriteRouter.post("/:id", postFavoriteHandler);
// DELETE;
favoriteRouter.delete("/delete/:id", deleteFavHandler);
//GET
favoriteRouter.get("/", getFavHandler)

module.exports = favoriteRouter;
