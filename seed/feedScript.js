const { Product, Sale, Inventory, sequelize } = require('../models/index.js');
const { faker } = require('@faker-js/faker');

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const seed = async () => {
  await sequelize.sync({ force: true });

  // 1. Create 50–100 Products
  const productCount = getRandomInt(50, 100);
  const products = [];

  for (let i = 0; i < productCount; i++) {
    products.push({
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      price: parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription()
    });
  }

  const createdProducts = await Product.bulkCreate(products);

  // 2. Create Inventory for each product
  const inventoryData = createdProducts.map(product => ({
    ProductId: product.id,
    currentStock: getRandomInt(0, 500),
    lastUpdated: faker.date.recent()
  }));

  await Inventory.bulkCreate(inventoryData);

  // 3. Create Sales records
  const sales = [];
  for (const product of createdProducts) {
    const saleCount = getRandomInt(1, 5); // 1–5 sales per product
    for (let i = 0; i < saleCount; i++) {
      const quantity = getRandomInt(1, 10);
      const unitPrice = product.price;
      sales.push({
        ProductId: product.id,
        quantity,
        saleDate: faker.date.recent(30),
        salePrice: parseFloat((quantity * unitPrice).toFixed(2))
      });
    }
  }

  await Sale.bulkCreate(sales);

  console.log(`Seeded: ${productCount} products, ${inventoryData.length} inventory items, ${sales.length} sales`);
  process.exit();
};

seed();
