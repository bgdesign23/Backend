const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Favorite",
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
      image: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://img.freepik.com/vector-gratis/gradiente-diseno-letrero-foto_23-2149288316.jpg",
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      material: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
		    type: DataTypes.DECIMAL,
		    allowNull: false,
		    validate: {
		    min: 0,
		    },
	    },
      stock: {
		    type: DataTypes.INTEGER,
		    allowNull: false,
        defaultValue: 0,
		    validate: {
		    min: 0,
		    },
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
    },
    { timestamps: false }
  );
};