"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Comments",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        pinId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Pins",
            onDelete: "CASCADE",
            hooks: true,
          },
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            onDelete: "CASCADE",
            hooks: true,
          },
        },
        body: {
          type: Sequelize.STRING(100),
          allowNull: false,
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
    options.tableName = "Comments";
    return queryInterface.dropTable(options);
  },
};
