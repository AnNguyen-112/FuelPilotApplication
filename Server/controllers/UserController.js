const express = require("express");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const userProfileModel = require("../models/UserProfile");
const User = require("../models/User");
/* TO DO LIST AFTER LOGIN MODULE IS COMPLETELY UPDATED
1. Need to verify which users are editing their profile
2. Change the profile of that user.
3. Need to add user ID to the JSON file before sending it to the mockData folders.
*/
const userData = fs.readFileSync("./mockData/Users.json");
const profileHistory = JSON.parse(userData);

//Fetching existing user profile
const fetchUserProfile = async (req, res) => {
  const email = req.query.userEmail;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "User not found" });
  }
  const userProfile = await userProfileModel.findOne({ userId: user._id });
  if (userProfile) {
    res.status(StatusCodes.OK).json(userProfile);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Profile not found!" });
  }
};
//Getting user profile from the profile form.
const getUserProfile = async (req, res) => {
  const newProfile = req.body;
  const userEmail = newProfile.userEmail;

  const newUserProfile = { ...newProfile, updateStatus: "Success" };
  // console.log(userProfile);
  //Send back the update profile

  /* DATABASE
    const newUserProfile = await userProfileModel.create(userProfile);
    res.status(StatusCodes.OK).json(newUserProfile);
   */

  //Sending profile to history file
  // Load JavaScript data from file
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    let userProfile = await userProfileModel.findOne({ userId: user._id });
    if (userProfile) {
      //Updating existing userProfile
      userProfile.fullName = newUserProfile.fullName;
      userProfile.address1 = newUserProfile.address1;
      userProfile.address2 = newUserProfile.address2;
      userProfile.city = newUserProfile.city;
      userProfile.state = newUserProfile.state;
      userProfile.zipCode = newUserProfile.zipCode;
      await userProfile.save();
      res.status(StatusCodes.OK).json(userProfile);
    } else {
      const userProfile = new userProfileModel({
        fullName: newUserProfile.fullName,
        address1: newUserProfile.address1,
        address2: newUserProfile.address2,
        city: newUserProfile.city,
        state: newUserProfile.state,
        zipCode: newUserProfile.zipCode,
        userId: user._id,
      });
      await userProfile.save();
      res.status(StatusCodes.CREATED).json(userProfile);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add user profile" });
  }
};

//Update user profile
// const updateUserProfile = async (req, res) => {
//   console.log("Working");
// };
module.exports = {
  getUserProfile,
  fetchUserProfile,
  // updateUserProfile,
};
