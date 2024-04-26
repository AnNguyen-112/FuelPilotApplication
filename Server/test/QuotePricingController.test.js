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
  describe('QuotePricingController', () => {
    describe('POST /pricingFromQuote', () => {
      it('should return 404 if user not found', (done) => {
        chai.request(server)
          .post('/pricingFromQuote')
          .send({ userEmail: 'nonexistent@example.com', gallonRequested: 500, deliveryDate: '2024-04-25' })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message', 'User not found');
            done();
          });
      });
  
      it('should return 400 if address details are incomplete', (done) => {
        // Assuming 'incomplete@example.com' is a known test case in your test DB
        chai.request(server)
          .post('/pricingFromQuote')
          .send({ userEmail: 'incomplete@example.com', gallonRequested: 500, deliveryDate: '2024-04-25' })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Please fill in your physical address in profile management before continue");
            done();
          });
      });
  
      it('should return 400 for invalid input', (done) => {
        chai.request(server)
          .post('/pricingFromQuote')
          .send({ userEmail: 'user@example.com', gallonRequested: 'invalid', deliveryDate: 'not-a-date' })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', 'Wrong Input');
            done();
          });
      });
  
      it('should return 200 and calculate the correct pricing', (done) => {
        // You need a user with a complete profile and valid quote history for this test
        chai.request(server)
          .post('/pricingFromQuote')
          .send({ userEmail: 'valid@example.com', gallonRequested: 1200, deliveryDate: '2024-04-25' })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.nested.property('Pricing.suggestedPricePerGallon');
            expect(res.body).to.have.nested.property('Pricing.total');
            expect(res.body).to.have.nested.property('Pricing.userAddress');
            done();
          });
      });
    });
  }); 