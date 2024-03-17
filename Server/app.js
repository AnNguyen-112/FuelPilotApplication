const path = require('path')

const express = require('express')
const dotenv = require("dotenv").config(); // read environment file .env

//routers
const authRouter = require('./routes/AuthRoutes');
const QuoteFormRouter = require('./routes/QuoteFormRoutes');
const QuoteHistoryRouter =require('./routes/QuoteHistoryRoutes');

//middleware
const notFoundMiddleware = require("./middleware/NotFound");
const errorHandler = require()


const app = express(); 




// Start the server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
