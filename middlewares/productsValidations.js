const validateName = (req, res, next) => {
  const { name } = req.body;

  const noName = { message: '"name" is required' };
  const noLength = { message: '"name" length must be at least 5 characters long' };

  if (!name) return res.status(400).json(noName);
  if (name.length < 5) return res.status(422).json(noLength);

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  const noQuantity = { message: '"quantity" is required' };
  const quantityNullable = { message: '"quantity" must be greater than or equal to 1' };

  if (quantity < 1) return res.status(422).json(quantityNullable);
  if (!quantity) return res.status(400).json(noQuantity);

  next();
};

module.exports = {
  validateName,
  validateQuantity,
};