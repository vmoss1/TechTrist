"use strict";

const { Favorite } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Favorite.bulkCreate([
        {
          userId: 1,
          pinId: 16,
        },
        {
          userId: 1,
          pinId: 27,
        },
        {
          userId: 1,
          pinId: 38,
        },
        {
          userId: 1,
          pinId: 9,
        },
        {
          userId: 1,
          pinId: 10,
        },
        {
          userId: 1,
          pinId: 11,
        },
        {
          userId: 1,
          pinId: 23,
        },
        {
          userId: 1,
          pinId: 32,
        },
        {
          userId: 1,
          pinId: 41,
        },
        {
          userId: 1,
          pinId: 22,
        },
        {
          userId: 2,
          pinId: 26,
        },
        {
          userId: 2,
          pinId: 27,
        },
        {
          userId: 2,
          pinId: 38,
        },
        {
          userId: 2,
          pinId: 9,
        },
        {
          userId: 2,
          pinId: 20,
        },
        {
          userId: 2,
          pinId: 2,
        },
        {
          userId: 2,
          pinId: 23,
        },
        {
          userId: 2,
          pinId: 32,
        },
        {
          userId: 2,
          pinId: 42,
        },
        {
          userId: 2,
          pinId: 22,
        },
        {
          userId: 3,
          pinId: 36,
        },
        {
          userId: 3,
          pinId: 37,
        },
        {
          userId: 3,
          pinId: 38,
        },
        {
          userId: 3,
          pinId: 9,
        },
        {
          userId: 3,
          pinId: 30,
        },
        {
          userId: 3,
          pinId: 3,
        },
        {
          userId: 3,
          pinId: 34,
        },
        {
          userId: 3,
          pinId: 24,
        },
        {
          userId: 3,
          pinId: 43,
        },
        {
          userId: 3,
          pinId: 22,
        },
      ]);
    } catch (e) {
      console.error(e);
      throw new Error("Check favorite validators");
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Favorites";
    return queryInterface.bulkDelete(options, null, {});
  },
};
