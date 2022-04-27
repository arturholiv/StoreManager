const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const productsValidations = require('../middlewares/productsValidations');

const route = express();

route.get('/', productsControllers.getAll);
route.get('/:id', productsControllers.getById);
route.post('/', productsValidations.validateName,
productsValidations.validateQuantity,
productsControllers.registerNewProduct);
route.put('/:id',
productsValidations.validateName,
productsValidations.validateQuantity,
productsControllers.updateProduct);
route.delete('/:id', productsControllers.deleteProduct);

module.exports = route;