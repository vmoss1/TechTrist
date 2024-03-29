"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Board.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Board.belongsToMany(models.Pin, {
        through: models.BoardPin,
        foreignKey: "boardId",
        otherKey: "pinId",
      });
      Board.hasMany(models.BoardPin, {
        foreignKey: "boardId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Board.init(
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
    },
    {
      sequelize,
      modelName: "Board",
      defaultScope: {
        attributes: {
          exclude: ["updatedAt"],
        }, // default query when searching for Users, the hashedPassword, updatedAt, and, depending on your application, email and createdAt fields should not be returned
      }, // protects
    }
  );
  return Board;
};
