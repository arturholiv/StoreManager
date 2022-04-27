const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../services/productsServices');
const productsModels = require('../../../models/productsModels');

const expectedReturn = {
  id: 4,
  name: 'la vitta',
  quantity: 100
};
const productsMock = [
  { id: 1, name: 'Martelo de Thor', quantity: 10 },
  { id: 2, name: 'Traje de encolhimento', quantity: 20 },
  { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
];

const productByIdMock =   { id: 1, name: 'Martelo de Thor', quantity: 10 };
describe('Products Services Tests', () => {
  describe('01 - When Searching for all products', () => {
    before(() => {
      sinon.stub(productsModels, 'getAll').resolves(productsMock);
    });
  
    after(() => {
      productsModels.getAll.restore();
    });

    it('should return an object', async () => {
      const result = await productsServices.getAll();
      expect(result).to.be.an('object');
    });

    it('the returned array has the keys "code" and "response" ', async () => {
      const result = await productsServices.getAll();
      expect(result).to.have.all.keys('code', 'response');
    });
  });

  describe('02 - When Searching a product by id', () => {

    before(() => {
      sinon.stub(productsModels, 'getById').resolves(productByIdMock);
    });
  
    after(() => {
      productsModels.getById.restore();
    });

    it('should return an object', async () => {
      const result = await productsServices.getById(1);
      // console.log(result.response);
      expect(result).to.be.an('object');
    });

    // it(' - the returned object should have the keys code and response', async () => {
    //   const result = await productsServices.getById(1);
    //   expect(result).to.have.all.keys('code', 'response');
    // });

    // it(' - the key response should be an object', async () => {
    //   const result = await productsServices.getById(1);
    //   expect(result.response).to.be.an('object');
    // });
  });

  describe('03 - When creates a new product', () => {
    before(async () => {
      sinon.stub(productsModels, 'getAll').resolves(productsMock);
      // sinon.stub(productsModels, 'productExists').resolves(true);
      sinon.stub(productsModels, 'registerNewProduct').resolves(productByIdMock);
    });
  
    after(async () => {
      productsModels.registerNewProduct.restore();
      // productsModels.productExists.restore();
      productsModels.getAll.restore();
    });

    it(' - the response should be a object', async () => {
      const result = await productsServices.registerNewProduct('dsasd', 323);
      console.log(result);
      expect(result).to.be.a('object');
    });
  });

  describe('04 - When updates a product', () => {
    const payload = (1, 'damelie', 33 );
    const expectedReturnn = {
      id: 1,
      name: 'damelie',
      quantity: 33
    };
    
    before(() => {
      sinon.stub(productsModels, 'getById').resolves(productByIdMock);
      sinon.stub(productsModels, 'updateProduct').resolves(expectedReturnn);
    });
  
    after(() => {
      productsModels.getById.restore();
      productsModels.updateProduct.restore();
    });

    it('should return an object', async () => {
      const result = await productsServices.updateProduct(payload);
      console.log(result);
      // expect(result).to.be.an('object');
    });
  });

  // describe('05 - When deleting a product', () => {
  //   before(() => {
  //     sinon.stub(productsModels, 'deleteProduct').resolves(false);
  //   });
  
  //   after(() => {
  //     productsModels.deleteProduct.restore();
  //   });

  //   it('should return an object', async () => {
  //     const result = await productsServices.deleteProduct(1);
  //     expect(result).to.be.an('object');
  //   });
  // });
});
