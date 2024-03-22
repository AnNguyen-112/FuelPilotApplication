const chai = require('chai');
const chaiHttp = require("chai-http");
const server = require("../app");
const { response } = require('express');

chai.should();

chai.use(chaiHttp);


describe ("Get /fuelquote/quoteform/getquotehistory", ()=>{
    it ("should return all quote history", (done) => {
        chai.request(server)
        .get("/fuelquote/quoteform/getquotehistory")
        .end((err,response) => {
            response.should.have.status(200);
        done();
        })
    })
} )

// Testing adding a quote to history
describe('Quote History API', () => {
    describe('/POST /fuelquote/quoteform/', () => {
      it('it should send a quote and add it to the quote history', (done) => {
        // Define a sample quote to add
        const quote = {
          gallonsRequested: 100,
          deliveryAddress: "1234 Test St, City, State, Zip",
          deliveryDate: "2024-01-01",
          suggestedPricePerGallon: 1.50,
          totalAmountDue: 150
        };
  
        // Make a POST request to your endpoint
        chai.request(server)
          .post('/fuelquote/quoteform/') // Ensure this matches the route in your app
          .send(quote)
          .end((err, res) => {
            // Start your assertions
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Quote added successfully');
            res.body.quote.should.have.property('gallonsRequested');
            res.body.quote.should.have.property('deliveryAddress');
            res.body.quote.should.have.property('deliveryDate');
            res.body.quote.should.have.property('suggestedPricePerGallon');
            res.body.quote.should.have.property('totalAmountDue');
            // Ensure that the response contains the properties you expect
            // Optionally, check for the values if needed
            done();
          });
      });
    });
  });

//Testing getting a single quote form
describe ("Get /fuelquote/quoteform/getquotehistory/:id", ()=>{
    it ("should return a single quote", (done) => {
        const id = 1;
        chai.request(server)
        .get(`/fuelquote/quoteform/getquotehistory/${id}`)
        .end((err,response) => {
            response.should.have.status(200);
        done();
        })
    })
} )
//Testing if id is null or undefined or invalid
describe ("Get /fuelquote/quoteform/getquotehistory/:id", ()=>{
    it ("should return an exception error", (done) => {
        chai.request(server)
        .get('/fuelquote/quoteform/getquotehistory/invalidId')
        .end((err,response) => {
            response.should.have.status(404);
        done();
        })
    })
} )
//Testing if id entered does not match with any quotes
describe ("Get /fuelquote/quoteform/getquotehistory/:id", ()=>{
    it ("should return an exception error", (done) => {
        const invalidID = 1000
        chai.request(server)
        .get(`'/fuelquote/quoteform/getquotehistory/${invalidID}`)
        .end((err,response) => {
            response.should.have.status(400);
        done();
        })
    })
} )
