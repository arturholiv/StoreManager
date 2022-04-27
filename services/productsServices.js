const productsModels = require('../models/productsModels');

const getAll = async () => {
  const products = await productsModels.getAll();
  if (!products) return { code: 500, response: null }; 
  return { code: 200, response: products };
};

const getById = async (id) => {
  const product = await productsModels.getById(id);
  if (product.length === 0) return { code: 404, message: { message: 'Product not found' } };
  return { code: 200, response: product[0] };
};

const productExists = async (name) => {
  const allProducts = await getAll();
  return allProducts.response.find((product) => product.name === name);
};

const registerNewProduct = async (name, quantity) => {
  const productExistss = await productExists(name);

  const product = await productsModels.registerNewProduct(name, quantity);
  if (productExistss) return { code: 409, message: { message: 'Product already exists' } };

  return { code: 201,
    response: {
        id: product.id,
        name,
        quantity,
      } };
};

const updateProduct = async (id, name, quantity) => {
  const searchId = await productsModels.getById(id);
  // const idExists = allProducts.find((product) => product.id === id);

  if (searchId.length === 0) return { code: 404, message: { message: 'Product not found' } };

  const product = await productsModels.updateProduct(id, name, quantity);
  return { code: 200, response: product };
};

const deleteProduct = async (id) => {
  const searchId = await productsModels.getById(id);
  if (searchId.length === 0) return { code: 404, message: { message: 'Product not found' } };
  await productsModels.deleteProduct(id);
  return { code: 204 };
};

module.exports = {
  getAll,
  getById,
  registerNewProduct,
  updateProduct,
  deleteProduct,
  productExists,
};