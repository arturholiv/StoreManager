const salesModels = require('../models/salesModels');

const getAll = async () => {
  const sales = await salesModels.getAll();
  if (!sales) return { code: 500, response: null }; 
  return { code: 200, response: sales };
};

const getById = async (id) => {
  const sale = await salesModels.getById(id);
  if (sale.length === 0) return { code: 404, message: { message: 'Sale not found' } };
  return { code: 200, response: sale };
};

const createSale = async (sales) => {
  const { id } = await salesModels.createSaleDate();

  const salesMap = await sales.map(async ({ productId, quantity }) => {
    await salesModels.createNewSale(
      id,
      productId,
      quantity,
    );
  });

  await Promise.all(salesMap);
  
  return { id, itemsSold: [...sales] };
};

const updateSale = async (saleId, sales) => {
  const searchId = await salesModels.getById(saleId);
  if (searchId.length === 0) return { code: 404, message: { message: 'Sale not found' } };

  const saleItems = sales.map(async ({ productId, quantity }) => {
    await salesModels.updateSale(saleId, productId, quantity);
  });

  await Promise.all(saleItems);

  return { code: 200, response: { saleId, itemUpdated: [...sales] } };
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
};