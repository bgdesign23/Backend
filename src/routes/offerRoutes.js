const { Router } = require("express");
const {
    getOfferHandler,
    postOffer_handler,
    getOfferByIdHandler,
    deleteOfferHandler, 
    // getOfferByNameHandler,
} = require("../handlers/offerHandler");
const offerRouter = Router();

// RUTAS GET;
offerRouter.get("/", getOfferHandler);
offerRouter.get("/:id", getOfferByIdHandler);
// offerRouter.get("/search/:name", getOfferHandler);

// RUTA POST;
offerRouter.post("/create/:id", postOffer_handler);

// RUTA DELETE;
offerRouter.delete("/delete/:id", deleteOfferHandler);

module.exports = offerRouter;