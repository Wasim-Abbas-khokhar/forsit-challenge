const { Inventory } = require("../models/index.js");

module.exports.addInventory = function (req, res) {
  const inventory = req.body;
  saveInventoryToDatabase(inventory, function (err, result) {
    if (err) {
      return res.status(500).send("Error saving inventory");
    }
    res.status(200).send("Inventory added successfully");
  });
};

async function saveInventoryToDatabase(inventory, callback) {
  await Inventory.create(inventory)
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      console.error("Error saving inventory:", err);
      callback(err);
    });
}

module.exports.getInventory = async function (req, res) {
  const filter = req.query;
   const result = await getInventoryToDatabase(filter);
    if (result.length === 0) {
        return res.status(404).send("Inventory not found");
    }else {
        res.status(200).json(result);
    }   
};
async function getInventoryToDatabase(params) {
  let whereClause = {};
  if (params.currentStock) {
    whereClause.currentStock = params.currentStock;
  }
  if (params.ProductId) {
    whereClause.ProductId = params.ProductId;
  }

  let res = await Inventory
    .findAll({
      where: whereClause,
    })
    .then((result) => {
        
      return result;
    })
    .catch((err) => {
      console.error("Error fetching inventory:", err);
      throw err;
    });

    return res;
}

module.exports.updateInventory = function (req, res) {
  const inventory = req.body;
  updateInventoryToDatabase(inventory, function (err, result) {
    if (err) {
      return res.status(500).send("Error saving inventory");
    }
    res.status(200).send("Inventory updated successfully");
  });
};

function updateInventoryToDatabase(inventory, callback) {
  Inventory.update(inventory, {
    where: {
      id: inventory.id,
    },
  })
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      console.error("Error updating inventory:", err);
      callback(err);
    });
}
