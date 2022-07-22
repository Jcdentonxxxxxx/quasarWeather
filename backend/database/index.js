const Sequelize = require("sequelize");
const dbConfig = require('../config/database.js');



const connection = new Sequelize(dbConfig);

try {
  connection.authenticate();
  console.log('Connection success');
} catch (error) {
  console.error('blyat', error);
}


module.exports = connection;
