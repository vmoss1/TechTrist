"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follower.belongsTo(models.User, {
        foreignKey: "followerId",
        as: "follower",
      });
      Follower.belongsTo(models.User, {
        foreignKey: "followingId",
        as: "following",
      });
    }
  }
  Follower.init(
    {
      followerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      followingId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Follower",
      defaultScope: {
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        }, // default query when searching for Users, the hashedPassword, updatedAt, and, depending on your application, email and createdAt fields should not be returned
      }, // protects
    }
  );
  return Follower;
};
