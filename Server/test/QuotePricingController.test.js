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
            userEmail: "test1@test.com",
            gallonsRequested: 100,
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