const sinon = require('sinon');
const { expect } = require('chai');

const { connection } = require('../../../models/connection');
const salesModels = require('../../../models/salesModels');


const salesMock = [[
  {
    "sale_id": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "product_id": 1,
    "quantity": 2
  },
  {
    "sale_id": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "product_id": 2,
    "quantity": 2
  }
]];

describe('sales Models Tests', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([salesMock]);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('01 - When Searching for all sales', () => {
    it('should return an array', async () => {
      const result = await salesModels.getAll();
      expect(result).to.be.an('array');
    });
  });

  describe('02 - When Searching by Id', () => {
    it('should return an array', async () => {
      const result = await salesModels.getById(1);
      expect(result).to.be.an('array');
    });
  });

  describe('03 - When Updating sale', () => {
    it('should return an array', async () => {
      const result = await salesModels.updateSale(1);
      expect(result).to.be.an('array');
    });
  });

  describe('03 - When creating a sale date ', () => {
    it('should return an array', async () => {
      const result = await salesModels.updateSale(1);
      expect(result).to.be.an('array');
    });
  });
});

