const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Coupon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0.20,
        },
      },
      usagesAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      code: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Para garantizar la unicidad de los códigos
      },
    },
    { timestamps: false }
  );
};