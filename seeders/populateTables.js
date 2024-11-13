'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    await queryInterface.bulkInsert('customers', [
      {
        customerID: 'c1', 
        customerName: 'Matt', 
        customerEmail: 'matt123@gmail.com', 
        customerAddress: '123 Monmouth Street, Monmouth NJ', 
        customerPassword: 'matt123',
      }, 
    ], {}); 

    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('customers', null, {}); 
  }
};
