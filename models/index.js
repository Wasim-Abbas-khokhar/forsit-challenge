const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);
console.log(process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Product = require('./product')(sequelize, Sequelize);
db.Sale = require('./sale')(sequelize, Sequelize);
db.Inventory = require('./inventory')(sequelize, Sequelize);

db.Product.hasMany(db.Sale);
db.Sale.belongsTo(db.Product);

db.Product.hasOne(db.Inventory);
db.Inventory.belongsTo(db.Product);

module.exports = db;
