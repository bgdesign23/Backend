const { Router } = require("express");
const {
    getOfferHandler,
    postOffer_handler,
} = require("../handlers/offerHandler");
const offerRouter = Router();

// RUTAS GET;
offerRouter.get("/", getOfferHandler);
// RUTA POST;
offerRouter.post("/create/:id", postOffer_handler)

module.exports = offerRouter;