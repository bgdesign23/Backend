const { Router } = require("express");
const { postFavoriteHandler } = require ("../handlers/favoriteHandler");
const favoriteRouter = Router();

// POST;
favoriteRouter.post("/:id", postFavoriteHandler);

module.exports = favoriteRouter;
