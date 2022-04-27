const sinon = require('sinon');
const { expect } = require('chai');

const salesControllers = require('../../../controllers/salesControllers');
const salesServices = require('../../../services/salesServices');

describe('Sales Controllers tests', () => {
  const request = {};
  const response = {};

  const expectedResponse = {
    code: 200,
    response: [
      {
        saleId: 1,
        date: '2022-04-01T19:06:57.000Z',
        productId: 1,
        quantity: 5
      },
      {
        saleId: 1,
        date: '2022-04-01T19:06:57.000Z',
        productId: 2,
        quantity: 6
      },
      {
        saleId: 2,
        date: '2022-04-01T19:06:57.000Z',
        productId: 3,
        quantity: 15
      }
    ],
  };

  const expectedSale = {
    code: 200,
    response: [
      { date: '2022-04-01T19:06:57.000Z, productId: 1', quantity: 5 },
      { date: '2022-04-01T19:06:57.000Z, productId: 2', quantity: 6 }
    ],
  };

  const createdReturn = {
    code: 201,
    response: {
      id: 4,
      itemsSold: [
        {
          productId: 1,
          quantity: 5
        },
        {
          productId: 2,
          quantity: 7
        }
      ]
    },
  };

  describe("01 - When Searching for all products", () => {
    before(() => {

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
  
      sinon.stub(salesServices, 'getAll').resolves(expectedResponse);
    });
  
    after(() => {
      salesServices.getAll.restore();
    });
      it('returns the response status 200', async () => {
        await salesControllers.getAll(request, response);
        expect(response.status.calledWith(expectedResponse.code)).to.be.equal(true);
      });
  })

  describe('02 - When searching by id', async () => {
    before(() => {
      request.body = {};
      request.params = { id: 1 }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getById').resolves(expectedSale);
    });
  
    after(() => {
      salesServices.getById.restore();
    });
  
    it('returns the response status 200', async () => {
      await salesControllers.getById(request, response);
      expect(response.status.calledWith(expectedSale.code)).to.be.equal(true);
    });
  });

  // describe('03 - When creates a new Sale', async () => {
  //   before(() => {
  //     request.body = [{ productId: 1, quantity: 22 }];
  //     request.params = {};
  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();
  //     sinon.stub(salesServices, 'createSale').resolves(createdReturn);
  //   });
  
  //   after(() => {
  //     salesServices.createSale.restore();
  //   });
  
  //   it('returns the response status 201', async () => {
  //     await salesControllers.createSale(request, response);
  //     expect(response.status.calledWith(createdReturn.code)).to.be.equal(true);
  //   });
  // });
  describe('04 - When updates a sale', async () => {
    const request = {};
    const response = {};
    before(() => {
      request.body = {  name: 'la vitta', quantity: 100 };
      request.params = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'updateSale').resolves(true);
    });
  
    after(() => {
      salesServices.updateSale.restore();
    });
  
    it('returns the response status 200', async () => {
      await salesControllers.updateSale(request, response);
      expect(response.status.calledWith(200)).to.be.equal(false);
    });
  });
});