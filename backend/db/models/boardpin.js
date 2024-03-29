"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoardPin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BoardPin.belongsTo(models.Board, {
        foreignKey: "boardId",
        // onDelete: "CASCADE",
        // hooks: true,
      });
      BoardPin.belongsTo(models.Pin, {
        foreignKey: "pinId",
        // onDelete: "CASCADE",
        // hooks: true,
      });
    }
  }
  BoardPin.init(
    {
      boardId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Board",
        },
      },
      pinId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Pin",
        },
      },
    },
    {
      sequelize,
      modelName: "BoardPin",
      defaultScope: {
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        }, // default query when searching for Users, the hashedPassword, updatedAt, and, depending on your application, email and createdAt fields should not be returned
      }, // protects
    }
  );
  return BoardPin;
};
