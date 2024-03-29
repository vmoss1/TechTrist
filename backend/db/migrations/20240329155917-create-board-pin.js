"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "BoardPins",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        boardId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Boards",
            onDelete: "CASCADE",
            hooks: true,
          },
        },
        pinId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Pins",
            onDelete: "CASCADE",
            hooks: true,
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "BoardPins";
    return queryInterface.dropTable(options);
  },
};
