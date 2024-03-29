"use strict";

const { Board } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Board.bulkCreate([
        {
          title: "Cool Stuff",
          userId: 1,
        },
        {
          title: "My Favorites",
          userId: 1,
        },
        {
          title: "Future Setups",
          userId: 1,
        },
        {
          title: "Wants and Needs",
          userId: 1,
        },
        {
          title: "NEEDS",
          userId: 1,
        },
        {
          title: "Check this stuff out",
          userId: 2,
        },
        {
          title: "One day soon..",
          userId: 3,
        },
        {
          title: "WHAT",
          userId: 4,
        },
        {
          title: "Yes Please",
          userId: 5,
        },
        {
          title: "Things I want soon",
          userId: 6,
        },
        {
          title: "Saving for these",
          userId: 7,
        },
        {
          title: "Future endeavors",
          userId: 8,
        },
        {
          title: "Cool Stuff I want ",
          userId: 9,
        },
        {
          title: "Check this out",
          userId: 10,
        },
      ]);
    } catch (e) {
      console.error(e);
      throw new Error("Check Board Validators");
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Boards";
    return queryInterface.bulkDelete(options, null, {});
  },
};
