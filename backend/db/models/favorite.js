"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favorite.belongsTo(models.User, {
        foreignKey: "userId",
        // onDelete: "CASCADE",
        // hooks: true,
      });
      Favorite.belongsTo(models.Pin, {
        foreignKey: "pinId",
        // onDelete: "CASCADE",
        // hooks: true,
      });
    }
  }
  Favorite.init(
    {
      pinId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Pins",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
        },
      },
    },
    {
      sequelize,
      modelName: "Favorite",
      defaultScope: {
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        }, // default query when searching for Users, the hashedPassword, updatedAt, and, depending on your application, email and createdAt fields should not be returned
      }, // protects
    }
  );
  return Favorite;
};
