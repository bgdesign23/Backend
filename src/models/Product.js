const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Product",
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      material: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      stock: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
      ratingCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalRating: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
      image: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://img.freepik.com/vector-gratis/gradiente-diseno-letrero-foto_23-2149288316.jpg",
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      offer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hashtag: {
        type: DataTypes.STRING,
      },
      amount: {
        //cantidad de productos
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
    },
    { paranoid: true }
  );
};
