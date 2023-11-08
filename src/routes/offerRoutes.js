const { Router } = require("express");
const {
    getOfferHandler,
    postOffer_handler,
    getOfferByIdHandler,
    deleteOfferHandler, 
    getOfferByNameHandler,
    restoreOfferHandler,
} = require("../handlers/offerHandler");
const offerRouter = Router();

// GET;
offerRouter.get("/", getOfferHandler);
offerRouter.get("/:id", getOfferByIdHandler);
offerRouter.get("/search/:title", getOfferByNameHandler);
offerRouter.get("/restore/:id", restoreOfferHandler);
// POST;
offerRouter.post("/create/:id", postOffer_handler);
// DELETE;
offerRouter.delete("/delete/:id", deleteOfferHandler);

module.exports = offerRouter;