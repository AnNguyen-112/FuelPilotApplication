const express = require("express");
const router = express.Router();

const {getUserProfile, updateUserProfile} = require('../controllers/UserController')

router.route("/").post(getUserProfile)

module.exports = router;