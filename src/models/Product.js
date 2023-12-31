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
      comments: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
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
      isDisabled: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
    },
    { paranoid: true }
  );
};
