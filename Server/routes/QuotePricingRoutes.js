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
 *           description: The gallon user wants to have
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
 *   get:
 *     summary: Get needed pricing
 *     tags: [Pricing]
 *     responses:
 *       200:
 *         description: The list of quote is return.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/pricing'
 *       500:
 *         description: Some server error
 *       404:
 *         description: pricing not found
 */

const { getPricing } = require("../controllers/QuotePricingController");

router.route("/").get(getPricing);

module.exports = router;
