const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      googleId: {
        type: DataTypes.TEXT,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
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
      image: {
        type: DataTypes.TEXT,
        defaultValue: 'https://i.imgur.com/veqwMvk.jpg'
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
        validate: {
          max: 5,
          min: 1,
        },
      },
      isDisabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    },
    { paranoid: true }
  );
};
