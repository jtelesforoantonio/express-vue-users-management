'use strict';
const faker = require('faker');
let users = [];

for (let i = 0; i < 25; i++) {
  users.push({
    nick: `_${faker.name.firstName()}`,
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'developer',
    roleId: faker.random.arrayElement([1, 2, 3]),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
