const { Offer, Product, User } = require("../../db");
const { Op } = require("sequelize");

// Obtenemos todas las OFERTAS;
const getOfferController = async () => {
  const data = await Offer.findAll();

  if(!data.length) {
    throw new Error ("did not find offers")
  }
  return data;
}

// Crea una oferta NUEVA;
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

// Busqueda de la oferta por nombre;
const getOfferByNameController = async (title) => {
  try {
    console.log(offerFound)
    const offerFound = await Offer.findAll({
      
      where: {
        name: {
          [Op.iLike]: `%${title.toLowerCase()}%`,
        },
      },
      include: {
        model: User,
        attributes: ["title"],
        as: "user",
      }
    });
    return offerFound
  } catch (error) {
    return new Error("this product does not exist");
  };
};

// Busqueda por ID;
const getOfferByIdController = async (id) => {
  try {
    const offerFound = await Offer.findOne({
      where: { id: id },
        include: {
          model: User,
          attributes: ["name"],
          as: "user",
        },
    });
    return offerFound;
  } catch (error) {
    return new Error("this offer does not exist");
  }
}

//Eliminar una oferta;
const deleteOfferController = async (id) => {
  if (id) {
    const data = await Offer.destroy(
      { where: { id: id } });
    return true;
  } else return false;
};


module.exports = {
    getOfferController,
    createNewOffer_controller,
    getOfferByIdController,
    deleteOfferController,
    getOfferByNameController,
}