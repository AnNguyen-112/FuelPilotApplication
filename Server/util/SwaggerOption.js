const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const SwaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Fuel Pilot API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3500",
      },
    ],
  },
//   apis: ["./routes/*.js"],
apis: ["../routes/*.js"],

};

module.exports =  SwaggerOptions ;
