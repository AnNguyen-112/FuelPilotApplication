const path = require("path");
const fs = require("fs");

const { StatusCodes } = require("http-status-codes");

const { quoteHistoryData } = require("../mockData/QuoteHistory");

const User = require("../models/User");
const QuoteForm = require("../models/QuoteForm");
const QuoteHistory = require("../models/QuoteHistory");
const UserProfile = require("../models/UserProfile");

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
        quoteFormList: [newQuoteForm],
        user: {
          email: userEmail,
          userId: user._id,
        },
      });
      await newQuoteHistory.save();
      // console.log(newQuoteHistory);
    } else {
      existingQuoteHistory.quoteFormList.push(newQuoteForm);
      await existingQuoteHistory.save();
    }
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Quote added successfully" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Failed to add quote to history" });
  }

  // if (!newQuote)
  // {
  //   res
  //   .status(StatusCodes.NOT_FOUND)
  //   .json({ message: "No Quote found" });
  // }
};

const getUserAddress = async (req, res) => {
  const userEmail = req.query.userEmail;
  // console.log(userEmail);

  const user = await User.findOne({email: userEmail});
  if (!user)
  {
    res.status(StatusCodes.NOT_FOUND).json({message: "User Not Found"});
  }

  const existingUserProfile = await UserProfile.findOne({ userId: user._id });
  if (!existingUserProfile) {
    res.status(StatusCodes.NOT_FOUND).json({message: "ADDRESS NOT FOUND. Please fill in profile management before continue"});
  } else if (
    !existingUserProfile.address1 ||
    !existingUserProfile.city ||
    !existingUserProfile.state ||
    !existingUserProfile.zipCode
  )
  {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        message:
       "ADDRESS NOT FOUND. Please fill in profile management before continue"});
  } else 
  {
    const userAddress = existingUserProfile.address1 +
    " " +
    existingUserProfile.city +
    ", " +
    existingUserProfile.state +
    ", " +
    existingUserProfile.zipCode;

    

    res.status(StatusCodes.OK).json({userAddress});
  } 

};

const getAllQuoteHistory = async (req, res) => {
  const userEmail = req.query.userEmail;
  // console.log(userEmail);

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "USER NOT FOUND" });
    } else {
      const userId = user._id;
      const existingQuoteHistory = await QuoteHistory.findOne({
        "user.userId": userId,
      })
        .populate("quoteFormList")
        .exec();

      // console.log(existingQuoteHistory);
      if (existingQuoteHistory) {
        
        const quoteFormList = existingQuoteHistory.quoteFormList;
        if (quoteFormList) {
          res.status(StatusCodes.OK).json(existingQuoteHistory.quoteFormList);
        } else {
          // Handle the case where quoteFormList is null
          res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "USER HISTORY NOT FOUND" });
        }
      } else {
        // Handle the case where existingQuoteHistory is null
        res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "USER HISTORY NOT FOUND" });
      }


      
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
  getUserAddress,
  getAllQuoteHistory,
  getSingleQuoteHistory,
};
