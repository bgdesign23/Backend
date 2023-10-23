const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: { 
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  
        primaryKey: true 
    },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: { 
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    },
    { timestamps: false }
  );
};