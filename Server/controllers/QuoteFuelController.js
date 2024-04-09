const path = require("path");
const fs = require("fs");

const { StatusCodes } = require("http-status-codes");

const { quoteHistoryData } = require("../mockData/QuoteHistory");

const addQuoteToHistory = async (req, res) => {
  function loadJSData(filePath) {
    return require(filePath);
  }

  console.log(quoteHistoryData);

  function generateNewId(data) {
    // Count the number of objects in the data array
    const count = data.length;

    // Increment the count by 1 to generate the new ID
    const newId = count + 1;

    return newId;
  }

  // Load JavaScript data from file
  const filePath = path.join(__dirname, "..", "mockdata", "quoteHistory.js");
  // const { quoteHistoryData: jsonData } = loadJSData(filePath);
  // console.log(jsonData);

  // Generate a new ID
  const newId = generateNewId(quoteHistoryData);
  // Create a new quote object with the provided request body and the new ID
  const newQuote = {
    id: newId,
    gallonsRequested: req.body.gallonsRequested,
    deliveryAddress: req.body.deliveryAddress,
    deliveryDate: req.body.deliveryDate,
    suggestedPricePerGallon: req.body.suggestedPricePerGallon,
    totalAmountDue: req.body.totalAmountDue,
  };
  
  if (!newQuote)
  {
    res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: "No Quote found" });
  }

  // Add the new quote object to the JavaScript data
  quoteHistoryData.push(newQuote);
 

  // Update the JavaScript data file
  const updatedFileContent = `const quoteHistoryData = ${JSON.stringify(
    quoteHistoryData,
    null,
    2
  )};
  module.exports = {quoteHistoryData};`;
  fs.writeFileSync(filePath, updatedFileContent);

  // Send a response indicating success
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Quote added successfully", quote: newQuote });
};

const getAllQuoteHistory = async (req, res) => {
  res.status(StatusCodes.OK).json(quoteHistoryData);
};

const getSingleQuoteHistory = async (req, res) => {
  const id = parseInt(req.params.id);

  //mocking id
  if (id === null || id === undefined || isNaN(id)) {
    res.status(StatusCodes.NOT_FOUND).send("ID is null or undefined");
  }

  const Quote = quoteHistoryData.find((quote) => quote.id === id);

  if (!Quote) {
    res.status(StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json(Quote);
};

module.exports = {
  addQuoteToHistory,
  getAllQuoteHistory,
  getSingleQuoteHistory,
};
