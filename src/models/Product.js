const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "products",
    {
      id: { 
         type: DataTypes.UUID, 
         defaultValue: DataTypes.UUIDV4,  
         primaryKey: true, 
        },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("Comercial", "Oficina", "Hogar"),
        allowNull: false,
      },
      precio: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
            min: 1,
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
    },
    { timestamps: false }
  );
};