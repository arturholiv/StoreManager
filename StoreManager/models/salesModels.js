const { connection } = require('./connection');

const getAll = async () => {
  const query = (`SELECT
    s.id as saleId,
    s.date,
    sp.product_id as productId,
    sp.quantity
    FROM StoreManager.sales s JOIN StoreManager.sales_products sp ON sp.sale_id = s.id
    ORDER BY saleId, productId;`);
  const [sales] = await connection.execute(query);
  return sales;
};

const getById = async (id) => {
  const query = `SELECT
    s.date,
    sp.product_id as productId,
    sp.quantity
    FROM StoreManager.sales s
    JOIN StoreManager.sales_products sp ON sp.sale_id = s.id
    WHERE s.id = ?`;
  const [sale] = await connection.execute(query, [id]);
  return sale;
};

const createSaleDate = async () => {
  const queryDate = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [{ insertId }] = await connection.execute(queryDate);
  return { id: insertId };
};

const createNewSale = async (saleId, productId, quantity) => {
  const queryInsert = `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES(?, ?, ?);`;
  await connection.execute(queryInsert, [saleId, productId, quantity]);
};

const updateSale = async (saleId, productId, quantity) => {
  const query = `UPDATE StoreManager.sales_products SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`;
  await connection.execute(query, [quantity, saleId, productId]);
  return [{ productId, quantity }];
};

module.exports = {
  getAll,
  getById,
  createSaleDate,
  createNewSale,
  updateSale,
};