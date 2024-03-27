"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Pins",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            onDelete: "CASCADE",
            hooks: true,
          },
        },
        description: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        imageUrl: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING(30),
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
    options.tableName = "Pins";
    return queryInterface.dropTable(options);
  },
};
