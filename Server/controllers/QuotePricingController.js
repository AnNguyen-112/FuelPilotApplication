const path = require("path");

const { StatusCodes } = require("http-status-codes");

const UserProfile = require('../models/UserProfile');
const User = require('../models/User')

const postPricingFromQuote = async (req, res) => {
  const unfinishQuote = req.body;
  // console.log(unfinishQuote);

  // from client:
  // userEmail: userEmail,
  // gallonRequested: gallonRequested,           
  // deliveryDate: deliveryDate,

// get the email from user and calculate the pricing and total amount

//get user adress
const user = await User.findOne({email: unfinishQuote.userEmail});

if (!user)
{
  res.status(StatusCodes.NOT_FOUND).json({message: "User not found"});
}

const userProfile = await UserProfile.findOne({userId: user._id});

if (!userProfile.address1 || !userProfile.city || !userProfile.state || !userProfile.zipCode)
{
   res.status(StatusCodes.BAD_REQUEST).json({message: "Please fill in your physical address in profile management before continue"});
}
else 

  userAddress = userProfile.address1 + " " + userProfile.city + ", " +  userProfile.state + ", " + userProfile.zipCode; 
  
  const requiredDate = new Date(unfinishQuote.deliveryDate);

  //validation for post input
  // console.log(new Date(unfinishQuote.deliveryDate))

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
      userAddress: userAddress,
    };
    
    res.status(StatusCodes.OK).json({ Pricing });
  }
};

module.exports = { postPricingFromQuote };
