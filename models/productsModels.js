const { connection } = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id;';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE products.id = ?;';
  const [product] = await connection.execute(query, [id]);
  return product;
};

const registerNewProduct = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';
  const [{ insertId }] = await connection.execute(query, [name, quantity]);
  return { id: insertId };
};

const updateProduct = async (id, name, quantity) => {
  const query = `UPDATE StoreManager.products
  SET name = ?, quantity = ? WHERE products.id = ?;`;
  await connection.execute(query, [id, name, quantity]);
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE products.id = ?;';
  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  getById,
  registerNewProduct,
  updateProduct,
  deleteProduct,
};