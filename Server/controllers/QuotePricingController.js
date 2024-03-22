const path = require("path");

const { StatusCodes } = require("http-status-codes");

const getPricing = async (req, res) => {
  const Pricing = {
    suggestedPricePerGallon: 50,
    total: 100,
  };

  res.status(StatusCodes.OK).json({Pricing});
};

module.exports = { getPricing };
