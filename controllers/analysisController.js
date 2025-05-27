const { Sale, Sequelize } = require('../models/index.js');
const { Op } = require('sequelize');

async function analyzeRevenue (req, res, next) {
  const now = new Date();

  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const getRevenue = async (startDate, endDate = now) => {
    const result = await Sale.findAll({
      where: {
        saleDate: {
          [Op.between]: [startDate, endDate]
        }
      },
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('salePrice')), 'totalRevenue']
      ],
      raw: true
    });
    
    return parseFloat(result[0].totalRevenue || 0);
  };

  const [daily, weekly, monthly, yearly] = await Promise.all([
    getRevenue(startOfDay),
    getRevenue(startOfWeek),
    getRevenue(startOfMonth),
    getRevenue(startOfYear)
  ]);
  
  res.json({
    dailyRevenue: daily,
    weeklyRevenue: weekly,
    monthlyRevenue: monthly,
    annualRevenue: yearly
  });
  
}
module.exports.analyzeRevenue = analyzeRevenue