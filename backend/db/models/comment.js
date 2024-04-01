"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
      Comment.belongsTo(models.Pin, {
        foreignKey: "pinId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Comment.init(
    {
      pinId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Pin",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
        },
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Comment",
      defaultScope: {
        attributes: {
          exclude: ["updatedAt"],
        }, // default query when searching for Users, the hashedPassword, updatedAt, and, depending on your application, email and createdAt fields should not be returned
      }, // protects
    }
  );
  return Comment;
};
