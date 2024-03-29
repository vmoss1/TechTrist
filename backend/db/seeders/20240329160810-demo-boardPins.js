"use strict";

const { BoardPin } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await BoardPin.bulkCreate([
        {
          boardId: 1,
          pinId: 1,
        },
        {
          boardId: 1,
          pinId: 2,
        },
        {
          boardId: 1,
          pinId: 3,
        },
        {
          boardId: 1,
          pinId: 4,
        },
        {
          boardId: 1,
          pinId: 5,
        },
        {
          boardId: 1,
          pinId: 6,
        },
        {
          boardId: 1,
          pinId: 7,
        },
        {
          boardId: 1,
          pinId: 8,
        },
        {
          boardId: 2,
          pinId: 5,
        },
        {
          boardId: 2,
          pinId: 6,
        },
        {
          boardId: 2,
          pinId: 7,
        },
        {
          boardId: 2,
          pinId: 8,
        },
        {
          boardId: 2,
          pinId: 9,
        },
        {
          boardId: 2,
          pinId: 10,
        },
        {
          boardId: 2,
          pinId: 11,
        },
        {
          boardId: 2,
          pinId: 12,
        },
        {
          boardId: 2,
          pinId: 13,
        },
        {
          boardId: 2,
          pinId: 14,
        },
        {
          boardId: 2,
          pinId: 15,
        },
        {
          boardId: 2,
          pinId: 16,
        },
        {
          boardId: 3,
          pinId: 17,
        },
        {
          boardId: 3,
          pinId: 18,
        },
        {
          boardId: 3,
          pinId: 19,
        },
        {
          boardId: 3,
          pinId: 20,
        },
        {
          boardId: 3,
          pinId: 21,
        },
        {
          boardId: 3,
          pinId: 22,
        },
        {
          boardId: 3,
          pinId: 23,
        },
        {
          boardId: 3,
          pinId: 24,
        },
        {
          boardId: 3,
          pinId: 25,
        },
        {
          boardId: 3,
          pinId: 26,
        },
        {
          boardId: 4,
          pinId: 27,
        },
        {
          boardId: 4,
          pinId: 28,
        },
        {
          boardId: 4,
          pinId: 29,
        },
        {
          boardId: 4,
          pinId: 30,
        },
        {
          boardId: 4,
          pinId: 31,
        },
        {
          boardId: 4,
          pinId: 32,
        },
        {
          boardId: 4,
          pinId: 33,
        },
        {
          boardId: 4,
          pinId: 34,
        },
        {
          boardId: 4,
          pinId: 35,
        },
        {
          boardId: 4,
          pinId: 36,
        },
        {
          boardId: 4,
          pinId: 37,
        },
        {
          boardId: 4,
          pinId: 38,
        },
        {
          boardId: 5,
          pinId: 38,
        },
        {
          boardId: 5,
          pinId: 39,
        },
        {
          boardId: 5,
          pinId: 40,
        },
        {
          boardId: 5,
          pinId: 41,
        },
        {
          boardId: 5,
          pinId: 42,
        },
        {
          boardId: 5,
          pinId: 43,
        },
        {
          boardId: 5,
          pinId: 44,
        },
        {
          boardId: 5,
          pinId: 45,
        },
        {
          boardId: 5,
          pinId: 1,
        },
        {
          boardId: 5,
          pinId: 2,
        },
        {
          boardId: 5,
          pinId: 3,
        },
        {
          boardId: 5,
          pinId: 4,
        },
        {
          boardId: 6,
          pinId: 4,
        },
        {
          boardId: 6,
          pinId: 5,
        },
        {
          boardId: 6,
          pinId: 6,
        },
        {
          boardId: 6,
          pinId: 7,
        },
        {
          boardId: 6,
          pinId: 8,
        },
        {
          boardId: 7,
          pinId: 4,
        },
        {
          boardId: 7,
          pinId: 5,
        },
        {
          boardId: 7,
          pinId: 6,
        },
        {
          boardId: 8,
          pinId: 2,
        },
        {
          boardId: 8,
          pinId: 3,
        },
        {
          boardId: 8,
          pinId: 6,
        },
        {
          boardId: 9,
          pinId: 6,
        },
        {
          boardId: 9,
          pinId: 7,
        },
        {
          boardId: 9,
          pinId: 8,
        },
        {
          boardId: 9,
          pinId: 9,
        },
        {
          boardId: 9,
          pinId: 10,
        },
        {
          boardId: 10,
          pinId: 9,
        },
        {
          boardId: 10,
          pinId: 10,
        },
        {
          boardId: 10,
          pinId: 11,
        },
        {
          boardId: 10,
          pinId: 12,
        },
        {
          boardId: 10,
          pinId: 13,
        },
        {
          boardId: 11,
          pinId: 9,
        },
        {
          boardId: 11,
          pinId: 12,
        },
        {
          boardId: 11,
          pinId: 13,
        },
        {
          boardId: 11,
          pinId: 14,
        },
        {
          boardId: 12,
          pinId: 11,
        },
        {
          boardId: 12,
          pinId: 12,
        },
        {
          boardId: 12,
          pinId: 13,
        },
        {
          boardId: 12,
          pinId: 14,
        },
        {
          boardId: 13,
          pinId: 15,
        },
        {
          boardId: 13,
          pinId: 16,
        },
        {
          boardId: 13,
          pinId: 17,
        },
        {
          boardId: 14,
          pinId: 17,
        },
        {
          boardId: 14,
          pinId: 18,
        },
        {
          boardId: 14,
          pinId: 19,
        },
        {
          boardId: 14,
          pinId: 20,
        },
      ]);
    } catch (e) {
      console.error(e);
      throw new Error("Check BoardPin validators");
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "BoardPins";
    return queryInterface.bulkDelete(options, null, {});
  },
};
