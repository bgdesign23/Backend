const { Offer, Product, User } = require("../../db");

const getOfferController = async () => {
  const data = await Offer.findAll();

  if(!data.length) {
    throw new Error ("did not find offers")
  }
  return data;
}

const createNewOffer_controller = async (data, id) => {
  
  try { 
    const findOffer = await Offer.findOne({
      where : { 
          title: data.title,
          description: data.description,
      },    
  })
  if(findOffer)
  return res.status(302).json( { message: "this offer already exists" });
    
  const findUser = await User.findOne({
      where : { 
          id: id,
      },    
  });
  if(!findUser) 
  throw new Error ("no existe un usario");
     
  const offerObj = {
    title: data.title,
    description: data.description,
  }
  const newOffer = await Offer.create(offerObj);
  await newOffer.setUser(findUser);
  return newOffer
} catch (error) {
  throw new Error(error.message);
}
}

module.exports = {
    getOfferController,
    createNewOffer_controller
}