const { 
    getOfferController,
    createNewOffer_controller
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

const postOffer_handler = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    
    if(
        !data.description ||
        !data.title
    )
    return res.status(400).json("missing form data");

    const newOffer = await createNewOffer_controller(data, id);
    return res.json(newOffer);
  } catch (error) {
    return res.status(500).json({ erorr: error.message });
  }
}

module.exports = {
    getOfferHandler,
    postOffer_handler
}