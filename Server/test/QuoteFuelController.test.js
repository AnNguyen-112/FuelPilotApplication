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

