/*
File name: controllers.js
Creator: Aditya Chouhan
Student ID: 301215583
Date : 16 October; 2022
*/

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

let userModel = require("../models/user");
let user = userModel.user;

module.exports.landingPage = (req, res, next) => {
  res.render("homepage", {
    title: "Homepage",
  });
};

module.exports.services = (req, res, next) => {
  res.render("services", {
    title: "Services",
  });
};

module.exports.projects = (req, res, next) => {
  res.render("projects", {
    title: "Projects",
  });
};

module.exports.contact = (req, res, next) => {
  res.render("contact", {
    title: "Contact",
  });
};

module.exports.about = (req, res, next) => {
  res.render("about", {
    title: "About ME!",
  });
};

module.exports.displayLoginPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/contactlist");
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processRegisterPage = (req, res, next) => {
  let newUser = new user({
    username: req.body.username,

    email: req.body.email,
  });

  user.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error: User Already Exists!"
        );
        console.log("Error: User Already Exists!");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : "",
      });
    } else {
      return passport.authenticate("local")(req, res, () => {
        res.redirect("/contactlist");
      });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

module.exports.performLogout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
