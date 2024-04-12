const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const { response } = require("express");

chai.should();

chai.use(chaiHttp);
