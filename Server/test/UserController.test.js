const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const { response } = require("express");

chai.should();

chai.use(chaiHttp);

describe("Post /userProfile", () => {
  it("should get user information", (done) => {
    let userProfile = {
      userEmail: "test1@test.com",
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
describe("Post /userProfile", () => {
  it("should create new user information", (done) => {
    let userProfile = {
      userEmail: "test2@test.com",
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
describe("Post /userProfile", () => {
  it("return exception error because did not provide enough information.", (done) => {
    let userProfile = {
      userEmail: "test1@test.com",
      fullName: "John Doe",
      city: "Anytown",
      state: "Anystate",
      zipCode: "12345",
    };
    chai
      .request(server)
      .post("/userProfile")
      .send(userProfile)
      .end((err, response) => {
        response.should.have.status(500);
        done();
      });
  });
});
describe("Post /userProfile", () => {
  it("cant find email, return exception error", (done) => {
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
        response.should.have.status(404);
        done();
      });
  });
});
describe("Get /userProfile", () => {
  it("should fetch user information", (done) => {
    const user_email = "test1@test.com"
    chai
      .request(server)
      .get(`/userProfile?userEmail=${user_email}`)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
describe("Get /userProfile", () => {
  it("should return exception error", (done) => {
    const user_email = "test1@gmail.com"
    chai
      .request(server)
      .get(`/userProfile?userEmail=${user_email}`)
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});
