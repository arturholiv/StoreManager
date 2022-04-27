const express = require('express');
const salesControllers = require('../controllers/salesControllers');
const salesValidations = require('../middlewares/salesValidations');

const route = express();

route.get('/', salesControllers.getAll);
route.get('/:id', salesControllers.getById);
route.post('/',
salesValidations.quantityValidation,
salesValidations.productIdValidation,
salesControllers.create);
route.put('/:id',
salesValidations.quantityValidation,
salesValidations.productIdValidation,
salesControllers.updateSale);

module.exports = route;