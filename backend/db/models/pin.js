"use strict";
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pin.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Pin.init(
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
        },
      },
      description: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
      category: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Pin",
      defaultScope: {
        attributes: {
          exclude: ["updatedAt"],
        }, // default query when searching for Users, the hashedPassword, updatedAt, and, depending on your application, email and createdAt fields should not be returned
      }, // protects
    }
  );
  return Pin;
};
