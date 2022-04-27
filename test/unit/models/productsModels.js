const sinon = require('sinon');
const { expect } = require('chai');

const { connection } = require('../../../models/connection');
const productsModels = require('../../../models/productsModels');

const productsMock = [
  { id: 1, name: 'Martelo de Thor', quantity: 10 },
  { id: 2, name: 'Traje de encolhimento', quantity: 20 },
  { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
];

describe('Products Models Tests', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([productsMock]);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('01 - When Searching for all products', () => {
    it('should return an array', async () => {
      const result = await productsModels.getAll();
      expect(result).to.be.an('array');
    });

    it('the returned array has properties "id", "name", and "quantity', async () => {
      const [result] = await productsModels.getAll();
      expect(result).to.have.all.keys('id', 'name', 'quantity');
    });
  });

  describe('02 - When searching for id', () => {
    it('- if the id exists: returns an array', async () => {
      const result = await productsModels.getById(1);
      expect(result).to.be.an('array');
    });
  });

  describe('03 - When Updating product', () => {
    it('should return an object', async () => {
      const result = await productsModels.updateProduct(1);
      expect(result).to.be.an('object');
    });
  });
});