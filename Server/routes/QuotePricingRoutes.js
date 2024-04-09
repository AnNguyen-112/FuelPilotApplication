const express = require("express");
const router = express.Router();



/**
 * @swagger
 * components:
 *   schemas:
 *     pricing:
 *       type: object
 *       required:
 *         - gallonsRequested
 *         - deliveryAddress
 *         - deliveryDate
 *       properties:
 *         gallonsRequested:
 *           type: integer
 *           description: The quote user wants to know price and total price
 *         deliveryAddress:
 *           type: string
 *           description: User Delivery Address
 *       example:
 *         gallonsRequested: 100
 *         deliveryAddress: "888 Elm St, City, State, Zipcode"
 *         deliveryDate: "2024-02-23"
 */

/**
 * @swagger
 * tags:
 *   name: Pricing
 *   description: The Pricing managing API
 * /pricing:
 *   post:
 *     summary: Submit pricing from a quote
 *     tags: [Pricing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/pricing'
 *     responses:
 *       201:
 *         description: Pricing successfully created and submitted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/pricing'
 *       500:
 *         description: Some server error
 *       404:
 *         description: Pricing not found
 */

const { postPricingFromQuote } = require("../controllers/QuotePricingController");

router.route("/").post(postPricingFromQuote);

module.exports = router;
