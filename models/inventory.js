module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Inventory', {
    currentStock: DataTypes.INTEGER,
    lastUpdated: DataTypes.DATE
  });
};
