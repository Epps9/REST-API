const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET/api/concerts/genre/:genre', () => {
  before(async () => {
    const testConcOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', id: 1, performer: 'Jack White', genre: 'Rock', price: 30, day: 3, image: '../cat.jpeg' });
    await testConcOne.save();
  
    const testConcTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', id: 2, performer: 'Rage against the machine', genre: 'Rock', price: 20, day: 2, image: '../guitar.jpeg' });
    await testConcTwo.save();
  });
  
  after(async () => {
    await Concert.deleteMany();
  });

    it('should find concerts according to the chosen genra', async () => {
        const res = await request(server).get('/api/concerts/genre/:genre');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array' || 'object');
        expect(res.body).to.not.be.null;
    });

});
