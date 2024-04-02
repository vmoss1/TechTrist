"use strict";

const { Follower } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Follower.bulkCreate([
        {
          followerId: 1,
          followingId: 2,
        },
        {
          followerId: 1,
          followingId: 3,
        },
        {
          followerId: 1,
          followingId: 4,
        },
        {
          followerId: 1,
          followingId: 5,
        },
        {
          followerId: 1,
          followingId: 6,
        },
        {
          followerId: 1,
          followingId: 7,
        },
        {
          followerId: 1,
          followingId: 8,
        },
        {
          followerId: 1,
          followingId: 9,
        },
        {
          followerId: 1,
          followingId: 10,
        },
        {
          followerId: 2,
          followingId: 1,
        },
        {
          followerId: 2,
          followingId: 3,
        },
        {
          followerId: 2,
          followingId: 4,
        },
        {
          followerId: 2,
          followingId: 5,
        },
        {
          followerId: 2,
          followingId: 6,
        },
        {
          followerId: 2,
          followingId: 7,
        },
        {
          followerId: 2,
          followingId: 8,
        },
        {
          followerId: 2,
          followingId: 9,
        },
        {
          followerId: 2,
          followingId: 10,
        },
        {
          followerId: 3,
          followingId: 2,
        },
        {
          followerId: 3,
          followingId: 1,
        },
        {
          followerId: 3,
          followingId: 4,
        },
        {
          followerId: 3,
          followingId: 5,
        },
        {
          followerId: 3,
          followingId: 6,
        },
        {
          followerId: 3,
          followingId: 7,
        },
        {
          followerId: 3,
          followingId: 8,
        },
        {
          followerId: 3,
          followingId: 9,
        },
        {
          followerId: 3,
          followingId: 10,
        },
        {
          followerId: 4,
          followingId: 2,
        },
        {
          followerId: 4,
          followingId: 3,
        },
        {
          followerId: 4,
          followingId: 1,
        },
        {
          followerId: 4,
          followingId: 5,
        },
        {
          followerId: 4,
          followingId: 6,
        },
        {
          followerId: 4,
          followingId: 7,
        },
        {
          followerId: 4,
          followingId: 8,
        },
        {
          followerId: 4,
          followingId: 9,
        },
        {
          followerId: 4,
          followingId: 10,
        },
        {
          followerId: 5,
          followingId: 2,
        },
        {
          followerId: 5,
          followingId: 3,
        },
        {
          followerId: 5,
          followingId: 4,
        },
        {
          followerId: 5,
          followingId: 1,
        },
        {
          followerId: 5,
          followingId: 6,
        },
        {
          followerId: 5,
          followingId: 7,
        },
        {
          followerId: 5,
          followingId: 8,
        },
        {
          followerId: 5,
          followingId: 9,
        },
        {
          followerId: 5,
          followingId: 10,
        },
        {
          followerId: 6,
          followingId: 2,
        },
        {
          followerId: 6,
          followingId: 3,
        },
        {
          followerId: 6,
          followingId: 4,
        },
        {
          followerId: 6,
          followingId: 5,
        },
        {
          followerId: 6,
          followingId: 1,
        },
        {
          followerId: 6,
          followingId: 7,
        },
        {
          followerId: 6,
          followingId: 8,
        },
        {
          followerId: 6,
          followingId: 9,
        },
        {
          followerId: 6,
          followingId: 10,
        },
        {
          followerId: 7,
          followingId: 2,
        },
        {
          followerId: 7,
          followingId: 3,
        },
        {
          followerId: 7,
          followingId: 4,
        },
        {
          followerId: 7,
          followingId: 5,
        },
        {
          followerId: 7,
          followingId: 6,
        },
        {
          followerId: 7,
          followingId: 1,
        },
        {
          followerId: 7,
          followingId: 8,
        },
        {
          followerId: 7,
          followingId: 9,
        },
        {
          followerId: 7,
          followingId: 10,
        },
        {
          followerId: 8,
          followingId: 2,
        },
        {
          followerId: 8,
          followingId: 3,
        },
        {
          followerId: 8,
          followingId: 4,
        },
        {
          followerId: 8,
          followingId: 5,
        },
        {
          followerId: 8,
          followingId: 6,
        },
        {
          followerId: 8,
          followingId: 7,
        },
        {
          followerId: 8,
          followingId: 1,
        },
        {
          followerId: 8,
          followingId: 9,
        },
        {
          followerId: 8,
          followingId: 10,
        },
        {
          followerId: 9,
          followingId: 2,
        },
        {
          followerId: 9,
          followingId: 3,
        },
        {
          followerId: 9,
          followingId: 4,
        },
        {
          followerId: 9,
          followingId: 5,
        },
        {
          followerId: 9,
          followingId: 6,
        },
        {
          followerId: 9,
          followingId: 7,
        },
        {
          followerId: 9,
          followingId: 8,
        },
        {
          followerId: 9,
          followingId: 1,
        },
        {
          followerId: 9,
          followingId: 10,
        },
        {
          followerId: 10,
          followingId: 2,
        },
        {
          followerId: 10,
          followingId: 3,
        },
        {
          followerId: 10,
          followingId: 4,
        },
        {
          followerId: 10,
          followingId: 5,
        },
        {
          followerId: 10,
          followingId: 6,
        },
        {
          followerId: 10,
          followingId: 7,
        },
        {
          followerId: 10,
          followingId: 8,
        },
        {
          followerId: 10,
          followingId: 9,
        },
        {
          followerId: 10,
          followingId: 1,
        },
      ]);
    } catch (e) {
      console.error(e);
      throw new Error("Check follower validators");
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Followers";
    return queryInterface.bulkDelete(options, null, {});
  },
};
