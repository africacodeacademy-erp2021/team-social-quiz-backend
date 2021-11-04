// Module imports
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

/**
 * register platform user
 *
 * @returns Resolved promise with Platform users
 */
exports.registerUser = async (
  accessToken,
  refreshToken,
  email,
  channel,
  username
) => {
  try {
    // TODO: ADD USER ACCESS SCOPES

    let newUser = await new User({
      accessToken: accessToken,
      refreshToken: refreshToken,
      email: email,
      channel: channel,
      accessScopes: [],
      "profile.name.screenName": username,
    }).save();

    return Promise.resolve(newUser);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * register admin user
 *
 * @returns Resolved promise with Platform users
 */
exports.registerAdmin = async (
  password,
  confirmPassword,
  email,
  channel,
  username
) => {
  try {
    // TODO: check if all fields are filled out
    // TODO: validate email
    // TODO: confirm if password matches with confirmPassword
    // TODO: use bycrpt to hash the password
    // TODO: Add user access scopes

    if (!password || !email || !channel || !username) {
      return Promise.reject("Fill out all fields ");
    }

    function validateEmail(email) {
      const emailFormat =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return emailFormat.test(String(email).toLowerCase());
    }
    if (!validateEmail(email)) {
      return Promise.reject("Invalid email");
    }

    var strongPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if(!strongPass.test(password)){
      return Promise.reject("Password very weak, password should atleast have 8 characters, uppercase, lowercase, numeric and special character");
    }

    if (password === confirmPassword) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      let newUser = await new User({
        password: password,
        email: email,
        channel: channel,
        accessScopes: [],
        "profile.name.screenName": username,
      }).save();
      return Promise.resolve(newUser);
    } else {
      return Promise.reject("password do not match");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

// incomplete functions

exports.generateAccessToken = async () => {};

exports.generateRefreshToken = async () => {};
