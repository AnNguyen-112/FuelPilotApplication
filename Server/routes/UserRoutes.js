const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       required:
 *         - fullName
 *         - address1
 *         - city
 *         - state
 *         - zipCode
 *       properties:
 *         fullName:
 *           type: string
 *           description: Name of user
 *         address1:
 *           type: string
 *           description: User Address 1
 *         address2:
 *           type: string
 *           description: User Address 2
 *         city:
 *           type: string
 *           description: User's city
 *         state:
 *           type: string
 *           description: User's state
 *         zipCode:
 *           type: string
 *           description: User's zipcode
 *       example:
 *         fullName: "user1"
 *         address1: "999 Main St"
 *         address2: "888 Minor St"
 *         city: "Houston"
 *         state: "Texas"
 *         zipCode: "9999"
 */

/**
 * @swagger
 * tags:
 *   name: UserProfile
 *   description: The User managing API
 * /userProfile:
 *   post:
 *     summary: Create a new User profile and put it in user List
 *     tags: [UserProfile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       201:
 *         description: The user profile created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       500:
 *         description: Some server error
 *       404:
 *         description: quote not found
 */

const {
  getUserProfile,
  fetchUserProfile,
} = require("../controllers/UserController");
router.route("/").get(fetchUserProfile);
router.route("/").post(getUserProfile);

module.exports = router;
