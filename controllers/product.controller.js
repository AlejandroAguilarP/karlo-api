const db = require('../models/index.js')

const getAll = async(req, res, next) => {
    try {
        const products = await db.Product.findAll();
        res.json({ products });
    } catch (error) {
        throw new Error(error.message)
    }
}
const createProduct = async (req, res, next) => {
    try {
      const prodData = {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_quantity: req.body.product_quantity,
        createdAt: new Date(),
      };
      const product = await Product.create(prodData);
      res.status(201).json({ product: product.user_id });
    } catch (error) {
      if (
        error.name === "SequelizeUniqueConstraintError" ||
        error.name === "SequelizeValidationError"
      ) {
        const errors = error.errors.map((err) => err.message);
        if (errors.length == 0) {
          errors.push("El email ya esta en uso");
        }
        res.status(400).json({ errors });
      } else {
        res.json({ error });
      }
    }
  };
const getOne = async(req, res, next) => {
    try {
        const product = await db.Product.findOne({where: {product_id: req.params.id}});
        if(product){
            res.json({product})
        } else{
            res.status(404).json({ message: "Product not found"});
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProd = async (req, res) => {
    try {
      await Product.destroy({
        where: { product_id: req.params.id },
      });
      res.status(200).json({ message: "Eliminado exitosamente" });
    } catch (error) {
      res.json({ error });
    }
  };

  const updateProd = async (req, res, next) => {
    try {
      const product = await Product.findOne({
        where: { product_id: req.params.id },
      });
      if (product) {
        product.product_name = req.body.product_name;
        product.product_price = req.body.product_price;
        product.product_quantity = req.body.product_quantity;
        await product.save();
        res.status(200).json({ product });
      }
      else{
          res.status(404).json({ message: "Product not found"});
      }
    } catch (error) {
      res.json({ error });
    }
  };

module.exports = {
    getAll,
    createProduct,
    getOne,
    deleteProd,
    updateProd
}