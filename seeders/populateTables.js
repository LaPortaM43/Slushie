'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
    await queryInterface.bulkInsert('customers', [
      {
        customerID: 'c1', 
        customerName: 'Matt', 
        customerEmail: 'matt123@gmail.com', 
        customerAddress: '123 Monmouth Street, Monmouth NJ', 
        customerPassword: 'matt123',
      }, 
      {
        customerID: 'c2', 
        customerName: 'Mark', 
        customerEmail: 'mark123@gmail.com', 
        customerAddress: '123 Monmouth Street, Monmouth NJ', 
        customerPassword: 'mark123',

      }, 
      {
        customerID: 'c3', 
        customerName: 'Bob', 
        customerEmail: 'bob123@gmail.com', 
        customerAddress: '123 Monmouth Street, Monmouth NJ', 
        customerPassword: 'bob123',
      }, 
      {
        customerID: 'c4', 
        customerName: 'Bill', 
        customerEmail: 'bill123@gmail.com', 
        customerAddress: '123 Monmouth Street, Monmouth NJ', 
        customerPassword: 'bill123',
      }, 
      {
        customerID: 'c5', 
        customerName: 'Tom', 
        customerEmail: 'tom123@gmail.com', 
        customerAddress: '123 Monmouth Street, Monmouth NJ', 
        customerPassword: 'tom123',
      }, 
    ], {}); 

    await queryInterface.bulkInsert('flavors', [
      {
        flavorID: 'f1av1', 
        flavorName: 'Vanilla', 
      }, 
      {
        flavorID: 'f1av2', 
        flavorName: 'Chocolate', 
      }, 
      {
        flavorID: 'f1av3', 
        flavorName: 'Strawberry', 
      }, 
      {
        flavorID: 'f1av4', 
        flavorName: 'Blueberry', 
      }, 
      {
        flavorID: 'f1av5', 
        flavorName: 'Raspberry', 
      }, 
    ], {}); 

    await queryInterface.bulkInsert('combo', [
      {
        comboID: 'cb1', 
        customerID: 'c1', 
        flavor1ID: 'flav1', 
        flavor2ID: null, 
        flavor3ID: null, 
      }, 
      {
        comboID: 'cb2', 
        customerID: 'c2', 
        flavor1ID: 'flav1', 
        flavor2ID: 'flav2', 
        flavor3ID: null, 
      }, 
      {
        comboID: 'cb3', 
        customerID: 'c3', 
        flavor1ID: 'flav1', 
        flavor2ID: 'flav2', 
        flavor3ID: 'flav3', 
      }, 
    ], {}); 

    await queryInterface.bulkInsert('branches', [
      {
        branchID: 'b1', 
        branchName: 'slushie',
        branchAddress: '123 Monmouth Street, Monmouth NJ',  
      }, 
      {
        branchID: 'b2', 
        branchName: 'slushie',
        branchAddress: '234 Monmouth Street, Monmouth NJ',  
      }, 
    ], {}); 

    await queryInterface.bulkInsert('orders', [
      {
        orderID: 'o1', 
        customerID: 'c1', 
        price: 10, 
        delieveryAddress: '123 Monmouth Street, Monmouth NJ',
        branchID: 'b1', 
        flavor1ID: 'flav1', 
        flavor2ID: 'flav2', 
        flavor3ID: 'flav3', 
      }, 
    ], {}); 

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('customers', null, {}); 
    await queryInterface.bulkDelete('flavors', null, {}); 
    await queryInterface.bulkDelete('combo', null, {}); 
    await queryInterface.bulkDelete('branches', null, {}); 
    await queryInterface.bulkDelete('orders', null, {}); 
  }
};

