const express = require("express");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const fs = require("fs");

/* TO DO LIST AFTER LOGIN MODULE IS COMPLETELY UPDATED
1. Need to verify which users are editing their profile
2. Change the profile of that user.
3. Need to add user ID to the JSON file before sending it to the mockData folders.
*/
const userData = fs.readFileSync("./mockData/Users.json");
const profileHistory = JSON.parse(userData);
//Getting user profile from the profile form.
const getUserProfile = async (req, res) => {
  const newProfile = req.body;

  const userProfile = { ...newProfile, updateStatus: "Success" };
  // console.log(userProfile);
  //Send back the update profile
  res.status(StatusCodes.OK).json(userProfile);
  //Sending profile to history file
  // Load JavaScript data from file
  if (userProfile) {
    const updatedProfile = {
      fullName: userProfile.fullName,
      address1: userProfile.address1,
      address2: userProfile.address2,
      city: userProfile.city,
      state: userProfile.state,
      zipCode: userProfile.zipCode,
    };
    profileHistory.userProfiles.push(updatedProfile);
    // console.log(profileHistory);
    //Write it to the JSON file
    fs.writeFileSync("./mockData/Users.json", JSON.stringify(profileHistory));
  }
};

//Update user profile
const updateUserProfile = async (req, res) => {
  console.log("Working");
};
module.exports = {
  getUserProfile,
  updateUserProfile,
};
