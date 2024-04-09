const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     quoteform:
 *       type: object
 *       required:
 *         - gallonsRequested
 *         - deliveryAddress
 *         - deliveryDate
 *         - suggestedPricePerGallon
 *         - totalAmountDue
 *       properties:
 *         id:
 *           type: number
 *           description: generate in server
 *         gallonsRequested:
 *           type: integer
 *           description: The gallon user wants to have
 *         deliveryAddress:
 *           type: string
 *           description: User Delivery Address
 *         suggestedPricePerGallon:
 *           type: number
 *           format: float
 *           description: Price of gallon base on User location
 *         totalAmountDue:
 *           type: number
 *           format: float
 *           description: final amount
 *       example:
 *         gallonsRequested: 100
 *         deliveryAddress: "888 Elm St, City, State, Zipcode"
 *         deliveryDate: "2024-02-23"
 *         suggestedPricePerGallon: 50
 *         totalAmountDue: 5000
 */

/**
 * @swagger
 * tags:
 *   name: Fuel Quote
 *   description: The fuel quote managing API
 * /quoteform:
 *   post:
 *     summary: Create a new fuel quote and put it in quote history
 *     tags: [FuelQuote]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/quoteform'
 *     responses:
 *       201:
 *         description: The created quote.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/quoteform'
 *       500:
 *         description: Some server error
 *       404:
 *         description: quote not found
 * /quoteform/getquotehistory:
 *   get:
 *     summary: Get all quote history
 *     tags: [FuelQuoteList]
 *     responses:
 *       200:
 *         description: The list of quote is return.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/quoteform/getquotehistory'
 *       500:
 *         description: Some server error
 *       404:
 *         description: list of quote not found
 * /quoteform/getquotehistory/{id}:
 *   get:
 *     summary: Get single quote history by id
 *     tags: [FuelQuoteList]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The quote id
 *     responses:
 *       200:
 *         description: The needed quote is return.
 *       500:
 *         description: Some server error
 *       404:
 *         description: quote not found
 */

const {
  addQuoteToHistory,
  getAllQuoteHistory,
  getSingleQuoteHistory,
} = require("../controllers/QuoteFuelController");

router.route("/").post(addQuoteToHistory);

router.route("/getquotehistory").get(getAllQuoteHistory);

router.route("/getquotehistory/:id").get(getSingleQuoteHistory);

module.exports = router;
