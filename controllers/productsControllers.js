const productsServices = require('../services/productsServices');

const getAll = async (_req, res, next) => {
  try {
    const products = await productsServices.getAll();
    return res.status(products.code).json(products.response);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsServices.getById(id);
    if (product.code === 404) return res.status(product.code).json(product.message);
    return res.status(product.code).json(product.response);
  } catch (e) {
    next(e);
  }
};

const registerNewProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const product = await productsServices.registerNewProduct(name, quantity);
    if (product.code === 409) return res.status(product.code).json(product.message);
    return res.status(product.code).json(product.response);
  } catch (e) {
    next(e);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const product = await productsServices.updateProduct(id, name, quantity);
    if (product.code === 404) return res.status(product.code).json(product.message);
    return res.status(product.code).json(product.response);
  } catch (e) {
    next(e);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productsServices.deleteProduct(id);

    if (response.code === 404) return res.status(response.code).json(response.message);
    return res.status(response.code).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  registerNewProduct,
  updateProduct,
  deleteProduct,
};