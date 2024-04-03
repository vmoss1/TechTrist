"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Pin, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
      User.hasMany(models.Board, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
      User.hasMany(models.Comment, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
      User.hasMany(models.Follower, {
        foreignKey: "followerId",
        as: "followers",
      });
      User.hasMany(models.Follower, {
        foreignKey: "followingId",
        as: "followings",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: {
          args: true,
          msg: "User already exists ensure you do not already have an account",
        },
        validate: {
          len: [4, 30],
          isNotEmail(val) {
            if (Validator.isEmail(val)) {
              throw new Error("Cannot be an email");
            }
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "User already exists ensure you do not already have an account",
        },
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [6, 60],
        },
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Profile picture cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["password", "email", "createdAt", "updatedAt"],
        }, // default query when searching for Users, the hashedPassword, updatedAt, and, depending on your application, email and createdAt fields should not be returned
      }, // protects sensitive information from being leaked
    }
  );
  return User;
};
