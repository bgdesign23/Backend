const { Offer, Product } = require("../../db");

const getOfferController = async () => {
  const data = await Offer.findAll();

  if(!data.length) {
    throw new Error ("did not find offers")
  }
  return data;
}

module.exports = {
    getOfferController,
}