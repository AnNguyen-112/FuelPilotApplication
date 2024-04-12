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
      "user.userId": user._id,
    });
    

    if (!existingQuoteHistory) {
     
      const newQuoteHistory = new QuoteHistory({
        quoteFormList : [newQuoteForm],
        user: {
          email: userEmail,
          userId: user._id,
        },
      });
      await newQuoteHistory.save();
      // console.log(newQuoteHistory);
    } 
    else 
    {
      existingQuoteHistory.quoteFormList.push(newQuoteForm);
      await existingQuoteHistory.save();
    }
    res.status(StatusCodes.CREATED).json({ message: "Quote added successfully" });


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

  
};

const getAllQuoteHistory = async (req, res) => {
  const userEmail = req.query.userEmail;
  console.log(userEmail);

  try {
    const user = await User.findOne({email: userEmail});
    

    if (!user)
    {
      res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "USER NOT FOUND" });

    } else {
      const userId = user._id;
      const existingQuoteHistory = await QuoteHistory
      .findOne({ "user.userId": userId })
      .populate('quoteFormList')
      .exec();

      
      // console.log(existingQuoteHistory);
  
      //  if (!existingQuoteHistory) {
  
      //   res
      //   .status(StatusCodes.NOT_FOUND)
      //   .json({ message: "USER HISTORY NOT FOUND" });
      // }
  
      
      res.status(StatusCodes.OK).json(existingQuoteHistory.quoteFormList);
    }
    

  } catch (err) {
    console.log(err);
  }
  
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
