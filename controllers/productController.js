const { Product } = require("../models/index.js");

module.exports.addProduct = function (req, res) {
  const product = req.body;
  saveProductToDatabase(product, function (err, result) {
    if (err) {
      return res.status(500).send("Error saving product");
    }
    res.status(200).send("Product added successfully");
  });
};

async function saveProductToDatabase(product, callback) {
  await Product.create(product)
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      console.error("Error saving product:", err);
      callback(err);
    });
}

module.exports.getProduct = async function (req, res) {
  const filter = req.query;
   const result = await getProductToDatabase(filter);
    if (result.length === 0) {
        return res.status(404).send("Product not found");
    }else {
        res.status(200).json(result);
    }   
};
async function getProductToDatabase(params) {
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

  let res = await Product
    .findAll({
      where: whereClause,
    })
    .then((result) => {
        
      return result;
    })
    .catch((err) => {
      console.error("Error fetching product:", err);
      throw err;
    });

    return res;
}

module.exports.updateProduct = function (req, res) {
  const product = req.body;
  updateProductToDatabase(product, function (err, result) {
    if (err) {
      return res.status(500).send("Error saving product");
    }
    res.status(200).send("Product updated successfully");
  });
};

function updateProductToDatabase(product, callback) {
  Product.update(product, {
    where: {
      id: product.id,
    },
  })
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      console.error("Error updating product:", err);
      callback(err);
    });
}
