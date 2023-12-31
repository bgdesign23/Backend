const { 
    getOfferController,
    createNewOffer_controller,
    getOfferByIdController,
    deleteOfferController,
    getOfferByNameController,
    restoreOfferController,
} = require("../controllers/offer/offerController");

const { Offer } = require ("../db");

// Obtenemos todas las ofertas;
const getOfferHandler = async (req, res) => {
    try {
       const ofertas = await getOfferController();
       return res.status(200).json(ofertas); 
    } catch (error) {
       return res.status(400).json({ error: error.message });
    };
};

// Creamos una oferta nueva;
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
  };
};

// Busqueda por nombre;
const getOfferByNameHandler = async (req, res) => {
  try {
    const { title } = req.params;
    const oferta = await getOfferByNameController(title);
    return res.status(200).json(oferta);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  };
};

// Busqueda por ID;
const getOfferByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const oferta = await getOfferByIdController(id);
    return res.status(200).json(oferta);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  };
};

// Eliminar una oferta;
const deleteOfferHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteOfferController(id);
    if(response) {
      return res.status(200).json("Delete Succesfully");
    } else return res.status(404).json("Offer not found");
  } catch (error) {
    return res.status(500).json({ error: error.message })
  };
};

// Restaurar una oferta;
const restoreOfferHandler = async (req, res) => {
  try {
    const {id} = req.params;
    const restored = await restoreOfferController(id);
    if(restored) return res.status(200).json(restored);
    return res.status(400).json({error: "Offer not found"});
  } catch (error) {
    res.status(200).json({error:error.message})
  };
};


module.exports = {
    getOfferHandler,
    postOffer_handler,
    getOfferByIdHandler,
    deleteOfferHandler,
    getOfferByNameHandler,
    restoreOfferHandler,
}