const chai = require('chai');
const chaiHttp = require("chai-http");
const server = require("../app");
const { response } = require('express');

chai.should();

chai.use(chaiHttp);

// Testing posting price from quote
describe('Quote History API', () => {
      it('it should post the price', (done) => {
        const unfinishedQuote = {
            gallonsRequested: 100,
            deliveryAddress: "1234 Test St, City, State, Zip",
            deliveryDate: "2024-01-01",
          };
        chai.request(server)
          .post('/pricing')
          .send(unfinishedQuote)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
  });