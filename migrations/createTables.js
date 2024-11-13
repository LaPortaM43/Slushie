'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('customers', { 
      customerID: {
        type: Sequelize.STRING(100), 
        primaryKey: true, 
        allowNull: false, 
      },
      customerName: { 
        type: Sequelize.STRING(100), 
        allowNull: false, 
      }, 
      customerEmail: { 
        type: Sequelize.STRING(100), 
        allowNull: false,
        unique: true,
      },
      customerAddress: { 
        type: Sequelize.STRING(),  
        allowNull: false,
      },
      customerPassword: { 
        type: Sequelize.STRING(), 
        allowNull: false, 
      },
    });

    await queryInterface.createTable('flavors', { 
      flavorID: {
        type: Sequelize.STRING(100), 
        primaryKey: true, 
        allowNull: false, 
      },
      flavorName: { 
        type: Sequelize.STRING(100), 
        allowNull: false, 
        unique: true,
      }, 
    });

    await queryInterface.createTable('combo', { 
      comboID: {
        type: Sequelize.STRING(100), 
        primaryKey: true, 
        allowNull: false, 
      },
      customerID: { 
        type: Sequelize.STRING(100),  
        references: { 
          model: 'customers', 
          key: 'customerID', 
        }, 
        allowNull: false,
      }, 
      flavor1ID: { 
        type: Sequelize.STRING(100), 
        references: { 
          model: 'flavors', 
          key: 'flavorID', 
        }, 
        allowNull: false, 
      },
      flavor2ID: { 
        type: Sequelize.STRING(100), 
        references: { 
          model: 'flavors', 
          key: 'flavorID', 
        }, 
        allowNull: true, 
      },
      flavor3ID: { 
        type: Sequelize.STRING(100), 
        references: { 
          model: 'flavors', 
          key: 'flavorID', 
        }, 
        allowNull: true, 
      },
    });

    await queryInterface.createTable('branches', { 
      branchID: {
        type: Sequelize.STRING(100), 
        primaryKey: true, 
        allowNull: false, 
      }, 
      branchName: { 
        type: Sequelize.STRING(100), 
        allowNull: false, 
      },
      branchAddress: { 
        type: Sequelize.STRING(), 
        allowNull: false, 
        unique: true, 
      },
    });

    await queryInterface.createTable('orders', { 
      orderID: { 
        type: Sequelize.STRING(100), 
        primaryKey: true, 
        allowNull: false, 
      }, 
      customerID: { 
        type: Sequelize.STRING(100),  
        references: { 
          model: 'customers', 
          key: 'customerID', 
        }, 
        allowNull: false,
      }, 
      price: { 
        type: Sequelize.INTEGER(), 
        allowNull: false, 
      },
      deliveryAddress: { 
        type: Sequelize.STRING(), 
        allowNull: true, 
      }, 
      branchID: { 
        type: Sequelize.STRING(100),  
        references: { 
          model: 'branches', 
          key: 'branchID', 
        }, 
        allowNull: false,
      }, 
      flavor1ID: { 
        type: Sequelize.STRING(100),  
        references: { 
          model: 'flavors', 
          key: 'flavorID', 
        }, 
        allowNull: false,
      }, 
      flavor2ID: { 
        type: Sequelize.STRING(100),  
        references: { 
          model: 'flavors', 
          key: 'flavorID', 
        }, 
        allowNull: false,
      }, 
      flavor3ID: { 
        type: Sequelize.STRING(100),  
        references: { 
          model: 'flavors', 
          key: 'flavorID', 
        }, 
        allowNull: false,
      }, 
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('customers');
    await queryInterface.dropTable('flavors');
    await queryInterface.dropTable('combo');
    await queryInterface.dropTable('branches');
    await queryInterface.dropTable('orders');
  }
};
