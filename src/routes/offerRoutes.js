const { Router } = require("express");
const {
    getOfferHandler,
} = require("../handlers/offerHandler");
const offerRouter = Router();

// RUTAS GET;
offerRouter.get("/", getOfferHandler);

module.exports = offerRouter;