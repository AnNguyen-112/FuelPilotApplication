const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const csrf = require('csurf')

const dotenv = require("dotenv").config();

//database (MongoDb)
const mongoose = require("mongoose");
// const MongoDBStore = require("connect-mongodb-session")(session);
const connectDB = require('./util/dbConn')

connectDB()

//csurf
const csrfProtection = csrf();

const app = express();

//config
var corsOptions = require("./util/CustomCor");
// const SwaggerOptions = require("./util/SwaggerOption");

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
  apis: ["./routes/*.js"],
};

app.use(cors(corsOptions));
app.use(csrfProtection);
const specs = swaggerJsdoc(SwaggerOptions);

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

//direct to Swagger
app.get("/", (req, res) => {
  res.send(
    ' <h1>Welcome to Fuel Pilot API</h1><p>Go to <a href="/app-docs">App document</a> for more details</p>'
  );
});

//swagger for testing api endpoint
app.use(
  "/app-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// Routers
const authRouter = require("./routes/AuthRoutes");
const QuotePricingRouter = require("./routes/QuotePricingRoutes");
const QuoteFuelRouter = require("./routes/QuoteFuelRoutes");
const profileManagement = require("./routes/UserRoutes");

// Middleware
const notFoundMiddleware = require("./middleware/NotFound");

// API
// class prepare for next assignment only
app.use("/pricing", QuotePricingRouter);
//fuel Quote module (include adding quote, get all history quote, get single history quote)
app.use("/quoteform", QuoteFuelRouter);
app.use("/userProfile", profileManagement);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3500;
// module.exports = app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// mongoose.connect('mongodb+srv://admin:admin@cluster0.d1xdybt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// .then(()=>{
//   console.log("Connected to mongoDB")
  
// }).catch(()=>{
//   console.log(error)
// })

mongoose.connection.once('open', () => {
  console.log('Connect to MongoDB');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})



