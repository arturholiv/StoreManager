const salesServices = require('../services/salesServices');

const getAll = async (_req, res, next) => {
  try {
    const sales = await salesServices.getAll();
    return res.status(sales.code).json(sales.response);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.getById(id);
    if (sale.code === 404) return res.status(sale.code).json(sale.message);
    return res.status(sale.code).json(sale.response);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const sales = req.body;
    const sale = await salesServices.createSale(sales);
    return res.status(201).json(sale);
  } catch (e) {
    next(e);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sales = req.body;

    const sale = await salesServices.updateSale(id, sales);
    if (sale.code === 404) return res.status(sale.code).json(sale.message);
    return res.status(sale.code).json(sale.response);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateSale,
};