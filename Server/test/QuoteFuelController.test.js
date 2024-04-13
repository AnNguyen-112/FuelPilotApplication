const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const { response } = require("express");

chai.should();

chai.use(chaiHttp);

describe("Get /fuelquote/quoteform/getquotehistory", () => {
    it("should return all quote history", (done) => {
      const user_email = "test1@test.com";
      chai
        .request(server)
        .get(`/quoteform/getquotehistory?userEmail=${user_email}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("Get /fuelquote/quoteform/getquotehistory", () => {
    it("should return exception error because cannot find userEmail", (done) => {
      const user_email = "test1@gmail.com";
      chai
        .request(server)
        .get(`/quoteform/getquotehistory?userEmail=${user_email}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  // Testing adding a quote to history 
  describe("Quote History API", () => {
    describe("/POST /fuelquote/quoteform/", () => {
      it("it should send a quote and add it to the quote history", (done) => {
        // Define a sample quote to add
        const quote = {
          userEmail: "test1@test.com",
          gallonRequested: "100",
          deliveryAddress: "1234 Test St, City, State, Zip",
          deliveryDate: "2024-01-01",
          suggestedPricePerGallon: "1.5",
          totalAmountDue: "150",
        };
  
        // Make a POST request to your endpoint
        chai
          .request(server)
          .post("/quoteform")
          .send(quote)
          .end((err, res) => {
            res.should.have.status(201);
            //   res.body.quote.should.have.property("gallonsRequested");
            //   res.body.quote.should.have.property("deliveryAddress");
            //   res.body.quote.should.have.property("deliveryDate");
            //   res.body.quote.should.have.property("suggestedPricePerGallon");
            //   res.body.quote.should.have.property("totalAmountDue");
            done();
          });
      });
    });
  });
  // Testing adding a quote to history 
  describe("Quote History API", () => {
    describe("/POST /fuelquote/quoteform/", () => {
      it("return exception error because missing one of the fields", (done) => {
        // Define a sample quote to add
        const quote = {
          userEmail: "test1@test.com",
          deliveryAddress: "1234 Test St, City, State, Zip",
          deliveryDate: "2024-01-01",
          suggestedPricePerGallon: "1.5",
          totalAmountDue: "150",
        };
  
        // Make a POST request to your endpoint
        chai
          .request(server)
          .post("/quoteform")
          .send(quote)
          .end((err, res) => {
            res.should.have.status(404);
            //   res.body.quote.should.have.property("gallonsRequested");
            //   res.body.quote.should.have.property("deliveryAddress");
            //   res.body.quote.should.have.property("deliveryDate");
            //   res.body.quote.should.have.property("suggestedPricePerGallon");
            //   res.body.quote.should.have.property("totalAmountDue");
            done();
          });
      });
    });
  });
  //Testing getting a single quote form
  describe("Get quoteform/getquotehistory/:id", () => {
    it("should return a single quote", (done) => {
      const id = 1;
      chai
        .request(server)
        .get(`/quoteform/getquotehistory/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  //Testing if id is null or undefined or invalid
  describe("Get /fuelquote/quoteform/getquotehistory/:id", () => {
    it("should return an exception error", (done) => {
      chai
        .request(server)
        .get("/quoteform/getquotehistory/invalidId")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  //Testing if id entered does not match with any quotes
  describe("Get /fuelquote/quoteform/getquotehistory/:id", () => {
    it("should return an exception error", (done) => {
      const invalidID = 1000;
      chai
        .request(server)
        .get(`/fuelquote/quoteform/getquotehistory/${invalidID}`)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });