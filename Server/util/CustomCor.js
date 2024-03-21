var express = require('express')
var cors = require('cors')
var app = express()

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}

module.exports = {corsOptions};

