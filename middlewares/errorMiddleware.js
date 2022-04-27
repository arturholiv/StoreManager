module.exports = (error, _req, res, _next) => {
  console.error(error);
  return res.status(500).json({ message: 'DataBase Error' });
};