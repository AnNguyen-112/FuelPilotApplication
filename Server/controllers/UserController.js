const express = require("express");
const { StatusCodes } = require("http-status-codes");

//Getting user profile from the profile form.
const getUserProfile = async (req, res) => {
  const newProfile = req.body;
  console.log(newProfile);
  const userProfile = { ...newProfile, updateStatus: "Success" };
  //Send back the update profile
  res.status(StatusCodes.OK).json(userProfile);
};
//Update user profile
const updateUserProfile = async (req,res) =>{
    console.log("Working");
}
module.exports = {
  getUserProfile,
  updateUserProfile
};
