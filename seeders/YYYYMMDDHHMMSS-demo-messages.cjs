'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, fetch user IDs
    const users = await queryInterface.sequelize.query(
      'SELECT id from "Users";'
    );
    const userRows = users[0];

    return queryInterface.bulkInsert('Messages', [
      {
        title: 'First Post',
        content: 'This is my first message!',
        authorId: userRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Welcome Message',
        content: 'Welcome to our club!',
        authorId: userRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};