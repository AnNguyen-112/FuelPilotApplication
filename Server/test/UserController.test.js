const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const { response } = require("express");

chai.should();

chai.use(chaiHttp);

describe("Post /userProfile", () => {
  it("should get user information", (done) => {
    let userProfile = {
      fullName: "John Doe",
      address1: "123 Main St",
      address2: "Apt 4",
      city: "Anytown",
      state: "Anystate",
      zipCode: "12345",
    };
    chai
      .request(server)
      .post("/userProfile")
      .send(userProfile)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        // Checking if the userProfile is returned
        response.body.should.have.property("fullName");
        response.body.should.have.property("address1");
        response.body.should.have
          .property("address2")
          .eql(userProfile.address2);
        response.body.should.have.property("city");
        response.body.should.have.property("state");
        response.body.should.have.property("zipCode");
        done();
      });
  });
});
