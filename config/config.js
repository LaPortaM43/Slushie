// config.js

module.exports = {
    development: {
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'Slushie123',
      database: process.env.DB_NAME || 'SlushieApp_DB',
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
    },
    production: {
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'Slushie123',
      database: process.env.DB_NAME || 'SlushieApp_DB',
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
      ssl: {
        rejectUnauthorized: false
      }
    }
  };
  