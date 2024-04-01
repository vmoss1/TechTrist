"use strict";

const { Comment } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Comment.bulkCreate([
        {
          userId: 1,
          pinId: 6,
          body: "This is super cool!",
        },
        {
          userId: 1,
          pinId: 7,
          body: "Really awesome stuff.",
        },
        {
          userId: 1,
          pinId: 8,
          body: "Wow I love this!",
        },
        {
          userId: 1,
          pinId: 9,
          body: "Post more like this.",
        },
        {
          userId: 2,
          pinId: 1,
          body: "Where did you get this?",
        },
        {
          userId: 3,
          pinId: 2,
          body: "I'm totally using this idea.",
        },
        {
          userId: 4,
          pinId: 3,
          body: "Thanks for the share",
        },
        {
          userId: 5,
          pinId: 4,
          body: "Send the links!!",
        },
        {
          userId: 6,
          pinId: 5,
          body: "Follow for follow?",
        },
        {
          userId: 6,
          pinId: 1,
          body: "This is great? Not convinced",
        },
        {
          userId: 10,
          pinId: 2,
          body: "I am a fan!",
        },
        {
          userId: 9,
          pinId: 3,
          body: "Check your DMs",
        },
        {
          userId: 8,
          pinId: 4,
          body: "Did'nt you sell this?",
        },
        {
          userId: 7,
          pinId: 5,
          body: "Sweet",
        },
        {
          userId: 3,
          pinId: 15,
          body: "Not a fan!",
        },
        {
          userId: 3,
          pinId: 16,
          body: "I have seen better bro",
        },
        {
          userId: 4,
          pinId: 16,
          body: "Don't listen to the haters!!",
        },
        {
          userId: 7,
          pinId: 1,
          body: "You got haters for no reason.",
        },
        {
          userId: 8,
          pinId: 11,
          body: "WOW BLOWN AWAY!",
        },
        {
          userId: 8,
          pinId: 12,
          body: "I am impressed",
        },
        {
          userId: 8,
          pinId: 40,
          body: "Sell to me?",
        },
        {
          userId: 8,
          pinId: 45,
          body: "I heard this was your first try?",
        },
        {
          userId: 8,
          pinId: 44,
          body: "I heard this was your first try?",
        },
        {
          userId: 5,
          pinId: 31,
          body: "I heard this was your first try?",
        },
        {
          userId: 5,
          pinId: 32,
          body: "Send links!",
        },
        {
          userId: 5,
          pinId: 3,
          body: "Don't gate keep!",
        },
      ]);
    } catch (e) {
      console.error(e);
      throw new Error("Check Comment validators");
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Comment";
    return queryInterface.bulkDelete(options, null, {});
  },
};
