const productIdValidation = (req, res, next) => {
  const [{ productId }] = req.body;

  const noProductId = { message: '"productId" is required' };
  if (!productId) return res.status(400).json(noProductId);

  next();
};

const quantityValidation = (req, res, next) => {
  const [{ quantity }] = req.body;
  const quantityIsNullable = { message: '"quantity" must be greater than or equal to 1' };
  const noQuantity = { message: '"quantity" is required' };

  if (quantity < 1) return res.status(422).json(quantityIsNullable);
  if (!quantity) return res.status(400).json(noQuantity);
  
  next();
};

module.exports = {
  quantityValidation,
  productIdValidation,
};