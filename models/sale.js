module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Sale', {
    quantity: DataTypes.INTEGER,
    saleDate: DataTypes.DATE,
    salePrice: DataTypes.FLOAT
  });
};
