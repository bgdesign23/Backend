const {
    getDesigns_Controller,
  } = require("../controllers/designs/designsController.js");
  
  const getDesigns_Handler = async (req, res) => {
    try {
      const result = await getDesigns_Controller();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    getDesigns_Handler,
  };
  