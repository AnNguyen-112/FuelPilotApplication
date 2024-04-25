const path = require("path");

const { StatusCodes } = require("http-status-codes");

const UserProfile = require("../models/UserProfile");
const User = require("../models/User");
const QuoteHistory = require("../models/QuoteHistory");

const postPricingFromQuote = async (req, res) => {
  const unfinishQuote = req.body;
  // console.log(unfinishQuote);

  // from client:
  // userEmail: userEmail,
  // gallonRequested: gallonRequested,
  // deliveryDate: deliveryDate,

  // get the email from user and calculate the pricing and total amount

  //get user adress
  const user = await User.findOne({ email: unfinishQuote.userEmail });

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
  }

  const userProfile = await UserProfile.findOne({ userId: user._id });

  if (
    !userProfile.address1 ||
    !userProfile.city ||
    !userProfile.state ||
    !userProfile.zipCode
  ) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        message:
          "Please fill in your physical address in profile management before continue",
      });
  } else
    userAddress =
      userProfile.address1 +
      " " +
      userProfile.city +
      ", " +
      userProfile.state +
      ", " +
      userProfile.zipCode;

  const requiredDate = new Date(unfinishQuote.deliveryDate);

  //validation for post input
  // console.log(new Date(unfinishQuote.deliveryDate))

  if (
    typeof parseInt(unfinishQuote.gallonsRequested) !== "number" ||
    isNaN(requiredDate.getTime())
  ) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Wrong Input" });
  } else {
    //data for calculating SuggestedPrice;
    const currentPrice = 1.5;

    //location factor
    let locationFactor;
    if (
      userProfile.state === "TX" ||
      userProfile.state === "Tx" ||
      userProfile.state === "tx" ||
      userProfile.state === "texas" ||
      userProfile.state === "Texas"
    ) {
      locationFactor = 0.02;
    } else {
      locationFactor = 0.04;
    }

    //rate history factor
    let rateHistoryFactor;
    const existingQuoteHistory = await QuoteHistory.findOne({
      "user.userId": user._id,
    });
    if (existingQuoteHistory) {
      rateHistoryFactor = 0.01;
    } else {
      rateHistoryFactor = 0;
    }

    //Gallons request factor
    let gallonRequestedFactor;
    const gallonRequested = unfinishQuote.gallonRequested;
    if (gallonRequested > 1000) {
      gallonRequestedFactor = 0.02;
    } else {
      gallonRequestedFactor = 0.03;
    }

    // company profit factor
    const companyProfitFactor = 0.1;

    //marign
    const margin =
      currentPrice *
      (locationFactor -
        rateHistoryFactor +
        gallonRequestedFactor +
        companyProfitFactor);
    console.log(gallonRequestedFactor);

    //suggested price
    const suggestedPricePerGallon = currentPrice + margin;

    //total price
    const totalPrice = suggestedPricePerGallon * gallonRequested;
    // mock data
    const Pricing = {
      suggestedPricePerGallon: suggestedPricePerGallon,
      total: totalPrice,
      userAddress: userAddress,
    };

    res.status(StatusCodes.OK).json({ Pricing });
  }
};

module.exports = { postPricingFromQuote };
