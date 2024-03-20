const express = require("express");
const router = express.Router();


const {
  addQuoteToHistory,
  getAllQuoteHistory,
  getSingleQuoteHistory,
} = require("../controllers/QuoteFuelController");

router.route("/").post(addQuoteToHistory);

router.route("/getquotehistory").get(getAllQuoteHistory);

router.route("/getquotehistory/:id").get(getSingleQuoteHistory);

module.exports = router;
