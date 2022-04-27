const sinon = require('sinon');
const { expect } = require('chai');

const productsControllers = require('../../../controllers/productsControllers');
const productsServices = require('../../../services/productsServices');

describe('Products Controllers Tests', () => {
  const servicesResponse = {
    code: 200,
    data: [
      {
        product_id: 1,
        date: '2021-09-09T04:54:29.000Z',
        product_id: 1,
        quantity: 2
      },
      {
        product_id: 1,
        date: '2021-09-09T04:54:54.000Z',
        product_id: 2,
        quantity: 2
      }
    ],
  };

  const expectedProduct = {
    code: 200,
    response: {
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10
    },
  };

  const createdReturn = {
    code: 201,
    response: {
      id: 4,
      name: 'la vitta',
      quantity: 100
    },
  };

  describe('01 - When Searching for all products', () => {
    const request = {};
    const response = {};
    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAll').resolves(servicesResponse);
    });

    after(() => {
      productsServices.getAll.restore();
    });
      it(' returns the response status 200', async () => {
        await productsControllers.getAll(request, response);
        expect(response.status.calledWith(servicesResponse.code)).to.be.equal(true);
      });
  });
  describe('02 - When searching by id', async () => {
    const request = {};
    const response = {};
    before(() => {
      request.body = {};
      request.params = { id: 1 }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getById').resolves(expectedProduct);
    });
  
    after(() => {
      productsServices.getById.restore();
    });
  
    it('returns the response status 200', async () => {
      await productsControllers.getById(request, response);
      expect(response.status.calledWith(expectedProduct.code)).to.be.equal(true);
    });
  });

  describe('03 - When creates a new product', async () => {
    const request = {};
    const response = {};
    before(() => {
      request.body = {  name: 'la vitta', quantity: 100 };
      request.params = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'registerNewProduct').resolves(createdReturn);
    });
  
    after(() => {
      productsServices.registerNewProduct.restore();
    });
  
    it('returns the response status 201', async () => {
      await productsControllers.registerNewProduct(request, response);
      expect(response.status.calledWith(createdReturn.code)).to.be.equal(true);
    });
  });

  describe('04 - When updates a product', async () => {
    const request = {};
    const response = {};
    before(() => {
      request.body = {  name: 'la vitta', quantity: 100 };
      request.params = { };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'updateProduct').resolves(true);
    });
  
    after(() => {
      productsServices.updateProduct.restore();
    });
  
    it('returns the response status 200', async () => {
      await productsControllers.updateProduct(request, response);
      expect(response.status.calledWith(200)).to.be.equal(false);
    });
  });
});