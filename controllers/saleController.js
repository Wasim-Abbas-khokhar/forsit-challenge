const { Sale } = require("../models/index.js");

module.exports.addSale = function (req, res) {
  const sale = req.body;
  saveSaleToDatabase(sale, function (err, result) {
    if (err) {
      return res.status(500).send("Error saving sale");
    }
    res.status(200).send("Sale added successfully");
  });
};

async function saveSaleToDatabase(sale, callback) {
  await Sale.create(sale)
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      console.error("Error saving sale:", err);
      callback(err);
    });
}

module.exports.getSale = async function (req, res) {
  const filter = req.query;
   const result = await getSaleToDatabase(filter);
    if (result.length === 0) {
        return res.status(404).send("Sale not found");
    }else {
        res.status(200).json(result);
    }   
};
async function getSaleToDatabase(params) {
  let whereClause = {};
  if (params.name) {
    whereClause.name = params.name;
  }
  if (params.category) {
    whereClause.category = params.category;
  }
  if (params.price) {
    whereClause.price = params.price;
  }
  if (params.stock) {
    whereClause.stock = params.stock;
  }
  if (params.description) {
    whereClause.description = params.description;
  } 
  if (params.id) {
    whereClause.id = params.id;
  }  

  let res = await Sale
    .findAll({
      where: whereClause,
    })
    .then((result) => {
        
      return result;
    })
    .catch((err) => {
      console.error("Error fetching sale:", err);
      throw err;
    });

    return res;
}

module.exports.updateSale = function (req, res) {
  const sale = req.body;
  updateSaleToDatabase(sale, function (err, result) {
    if (err) {
      return res.status(500).send("Error saving sale");
    }
    res.status(200).send("Sale updated successfully");
  });
};

function updateSaleToDatabase(sale, callback) {
  Sale.update(sale, {
    where: {
      id: sale.id,
    },
  })
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      console.error("Error updating sale:", err);
      callback(err);
    });
}
