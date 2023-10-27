const { Design } = require("../../db.js");

const getDesigns_Controller = async () => {
  const data = await Design.findAll();
  if (!data.length) {
    throw new Error("No se encontraron diseños");
  }
  return data;
};

module.exports = {
    getDesigns_Controller,
  };
  