const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// var csurf = require('csurf')

const dotenv = require('dotenv').config();

const app = express();

//config
var corsOptions = require("./middleware/CustomCor");

app.use(cors(corsOptions));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());


// Routers
const authRouter = require('./routes/AuthRoutes');
const QuotePricingRouter = require('./routes/QuotePricingRoutes');
const QuoteFuelRouter = require('./routes/QuoteFuelRoutes');

// Middleware
const notFoundMiddleware = require('./middleware/NotFound');

// API
// class prepare for next assignment only
// app.use('/fuelquote/pricing', QuotePricingRouter); 
//fuel Quote module (include adding quote, get all history quote, get single history quote)
app.use('/fuelquote/quoteform', QuoteFuelRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
