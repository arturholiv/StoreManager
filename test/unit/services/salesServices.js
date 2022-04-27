const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const salesModels = require('../../../models/salesModels');

const saleByIdMock = [
	{
		"date": "2022-04-04T21:43:01.000Z",
		"productId": 1,
		"quantity": 5
	},
	{
		"date": "2022-04-04T21:43:01.000Z",
		"productId": 2,
		"quantity": 10
	},
	{
		"date": "2022-04-04T21:43:01.000Z",
		"productId": 1,
		"quantity": 5
	},
	{
		"date": "2022-04-04T21:43:01.000Z",
		"productId": 2,
		"quantity": 10
	}
];

const expectedReturn = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 22
    }
  ]
};

const expectedReturnn = {
  "saleId": "1",
  "itemUpdated": [
    {
      "productId": 3333,
      "quantity": 420
    }
  ]
};

describe('Sales Services Tests', () => {
  before(() => {
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

    sinon.stub(salesModels, 'getAll').resolves(salesMock);
  });

  after(() => {
    salesModels.getAll.restore();
  });
  describe('01 - When Searching for all sales', () => {
    it('should return an object', async () => {
      const result = await salesServices.getAll();
      expect(result).to.be.an('object');
    });

    it('the returned object has the keys "code" and "response" ', async () => {
      const result = await salesServices.getAll();
      expect(result).to.have.all.keys('code', 'response');
    });
  });

  

  describe('02 - When Searching a sale by id', () => {
    before(() => {
      sinon.stub(salesModels, 'getById').resolves(saleByIdMock);
    });
  
    after(() => {
      salesModels.getById.restore();
    });

    it('should return an object', async () => {
      const result = await salesServices.getById(1);
      expect(result).to.be.an('object');
    });

    it(' - the returned object should have the keys code and response', async () => {
      const result = await salesServices.getById(1);
      expect(result).to.have.all.keys('code', 'response');
    });

    it(' - the key response should be an array', async () => {
      const result = await salesServices.getById(1);
      expect(result.response).to.be.an('array');
    });
  });

  describe('03 - When creates a new sale', () => {
    const payload = [ { productId: 3, quantity: 2 } ];
    before(() => {
      sinon.stub(salesModels, 'createSaleDate').resolves(expectedReturn);
      sinon.stub(salesModels, 'createNewSale').resolves(expectedReturn);
    });
  
    after(() => {
      salesModels.createSaleDate.restore();
    });

    it(' - the key itemsSold should return an array', async () => {
      const result = await salesServices.createSale(payload);
      expect(result).to.be.an('object');
    });
  });
  
  describe('04 - When updates a sale', () => {
    const expected = (1, 'expelia', 100);

    const updSaleBody =   [
      {
        "productId": 2,
        "quantity": 6
      }
    ];
    
    before(async () => {
      sinon.stub(salesModels, 'getById').resolves(saleByIdMock);
      sinon.stub(salesModels, 'updateSale').resolves(expectedReturnn);
    });
  
    after(async () => {
      salesModels.getById.restore();
      salesModels.updateSale.restore();
    });
  
    it('should return an object', async () => {
      const result = await salesServices.updateSale(1, updSaleBody);
      expect(result).to.be.an('object');
    });
  });
});

