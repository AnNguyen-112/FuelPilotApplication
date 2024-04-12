const path = require("path");

const { StatusCodes } = require("http-status-codes");

const postPricingFromQuote = async (req, res) => {
  const unfinishQuote = req.body;
  console.log(unfinishQuote);

// get the email from user and calculate the pricing and total amount

  const requiredDate = new Date(unfinishQuote.deliveryDate);

  //validation for post input
 console.log(new Date(unfinishQuote.deliveryDate))
  if (
    typeof parseInt(unfinishQuote.gallonsRequested) !== "number" ||
    isNaN(requiredDate.getTime())  
  ) 
  {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Wrong Input" });
  } else {
    // mock data
    const Pricing = {
      suggestedPricePerGallon: 50,
      total: 100,
      userAddress: "9999 NineRoad City State 77072"
    };

    //return the pricing, can change to a full quote if want
    res.status(StatusCodes.OK).json({ Pricing });
  }
};

module.exports = { postPricingFromQuote };
