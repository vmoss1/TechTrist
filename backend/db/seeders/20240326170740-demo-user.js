"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await User.bulkCreate(
        [
          {
            email: "demo@user.io",
            firstName: "Tlon",
            lastName: "Rusk",
            profilePicture: "./images/profilepic1.jpg",
            username: "Demo-lition",
            password: bcrypt.hashSync("password"),
          },
          {
            email: "user1@user.io",
            firstName: "Deff",
            lastName: "Bozos",
            profilePicture: "./images/profilepic2.jpg",
            username: "FakeUser1",
            password: bcrypt.hashSync("password"),
          },
          {
            email: "user2@user.io",
            firstName: "Dill",
            lastName: "Dates",
            profilePicture: "./images/profilepic3.jpg",
            username: "FakeUser2",
            password: bcrypt.hashSync("password"),
          },
          {
            email: "user3@user.io",
            firstName: "Park",
            lastName: "Muckerberg",
            profilePicture: "./images/prolfiepic4.jpg",
            username: "FakeUser3",
            password: bcrypt.hashSync("password"),
          },
          {
            email: "user4@user.io",
            firstName: "Kim",
            lastName: "Took",
            profilePicture: "./images/prolfilepic5.jpg",
            username: "FakeUser4",
            password: bcrypt.hashSync("password"),
          },
          {
            email: "user5@user.io",
            firstName: "Barry",
            lastName: "Wage",
            profilePicture: "./images/profilepic6.jpg",
            username: "FakeUser5",
            password: bcrypt.hashSync("password"),
          },
          {
            email: "user6@user.io",
            firstName: "Mercy",
            lastName: "Srin",
            profilePicture: "./images/profilepic7.jpg",
            username: "FakeUser6",
            password: bcrypt.hashSync("password"),
          },
          {
            email: "user7@user.io",
            firstName: "Patya",
            lastName: "Kadella",
            profilePicture: "../images/profilepic8.jpg",
            username: "FakeUser7",
            password: bcrypt.hashSync("password"),
          },
          {
            email: "user8@user.io",
            firstName: "Pack",
            lastName: "Forsey",
            profilePicture: "./images/profilepic9.jpg",
            username: "FakeUser8",
            password: bcrypt.hashSync("password"),
          },
          {
            email: "user9@user.io",
            firstName: "Punder",
            lastName: "Sichai",
            profilePicture: "./images/profile10.jpg",
            username: "FakeUser9",
            password: bcrypt.hashSync("password"),
          },
        ],
        { validate: true }
      );
    } catch (e) {
      console.error(e);
      throw new Error("Check User validators");
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users"; // keying into groups table
    return queryInterface.bulkDelete(options, null, {});
  },
};
