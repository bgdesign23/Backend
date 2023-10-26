const { 
    getOfferController,
} = require("../controllers/offer/offerController");

const { Offer } = require ("../db");

const getOfferHandler = async (req, res) => {
    try {
       const ofertas = await getOfferController();
       return res.status(200).json(ofertas); 
    } catch (error) {
       return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getOfferHandler,
}