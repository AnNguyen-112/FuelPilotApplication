const path = require("path");
const fs = require("fs");

const { StatusCodes } = require("http-status-codes");

const { quoteHistoryData } = require("../mockData/QuoteHistory");

const User = require("../models/User");
const QuoteForm = require("../models/QuoteForm");
const QuoteHistory = require("../models/QuoteHistory");

const addQuoteToHistory = async (req, res) => {
  const userEmail = req.body.userEmail;
  const gallonsRequested = req.body.gallonRequested;
  const deliveryAddress = req.body.deliveryAddress;
  const deliveryDate = req.body.deliveryDate;
  const suggestedPricePerGallon = req.body.suggestedPricePerGallon;
  const totalAmountDue = req.body.totalAmountDue;

  try {
    const user = await User.findOne({ email: userEmail });

    // // Create a new quote object with the provided request body and the new ID
    const newQuoteForm = new QuoteForm({
      gallonsRequested: gallonsRequested,
      deliveryAddress: deliveryAddress,
      deliveryDate: deliveryDate,
      suggestedPricePerGallon: suggestedPricePerGallon,
      totalAmountDue: totalAmountDue,
      userId: user._id,
    });

    await newQuoteForm.save();

    // console.log(newQuoteForm);

    const existingQuoteHistory = await QuoteHistory.findOne({
      "user._id": user._id,
    });

    if (!existingQuoteHistory) {
      const newQuoteHistory = new QuoteHistory({
        quoteFormList: [newQuoteForm],
        user: {
          email: userEmail,
          _id: user._id,
        },
      });
      await newQuoteHistory.save();
    } else {
      existingQuoteHistory.quoteFormList.push(newQuoteForm);
      await existingQuoteHistory.save();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add quote to history" });
  }

  // if (!newQuote)
  // {
  //   res
  //   .status(StatusCodes.NOT_FOUND)
  //   .json({ message: "No Quote found" });
  // }

  res.status(StatusCodes.CREATED).json({ message: "Quote added successfully" });
};

const getAllQuoteHistory = async (req, res) => {
  const userEmail = req.query.userEmail;

  // try {
  //   const user = await User.findOne({email: userEmail});

  //   if (!user)
  //   {
  //     res
  //     .status(StatusCodes.NOT_FOUND)
  //     .json({ message: "USER NOT FOUND" });

  //   }

  //   // const existingQuoteHistory = await QuoteHistory.findOne({ "user._id": user._id }).populate('quoteFormList');
  //   // console.log(existingQuoteHistory);

  //   //  if (!existingQuoteHistory) {

  //   //   res
  //   //   .status(StatusCodes.NOT_FOUND)
  //   //   .json({ message: "USER HISTORY NOT FOUND" });
  //   // }

  //   console.log(quoteHistoryData);
  //   res.status(StatusCodes.OK).json(quoteHistoryData);

  // } catch (err) {
  //   console.log(err);
  // }
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
