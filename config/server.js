/*
File name: server.js
Creator: Aditya Chouhan
Student ID: 301215583
Date : 16 October; 2022
*/
//require("dotenv").config();
const express = require("express");
const app = express();

const path = require("path");

// modules for authentication
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const localStrategy = passportLocal.Strategy;
const flash = require("connect-flash");

//Import routes
const router = require("../app/routes/routes");
const contactsRouter = require("../app/routes/contactsroutes");

//Mongoose setup
const mongoose = require("mongoose");

const db = require("./mongodb");

//Connect mongoose to mongodb
mongoose.connect(db.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "Connection Error:"));
mongodb.once("open", () => {
  console.log("Connected to MongoDB...");
});

//Morgan setup
const morgan = require("morgan");
app.use(morgan("dev"));

//For parser
app.use(express.urlencoded({ extended: false }));

//Setup default view wngine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../app", "views"));

//Setup express session
app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

//Initialize flash
app.use(flash());

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Passport User configuration
const userModel = require("../app/models/user");
const user = userModel.user;

//Implement a User Authentication Strategy
passport.use(user.createStrategy());

//Encrypt and dcrypt user info
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//Middleware for routes
app.use("/", router);
app.use("/contactlist", contactsRouter);

//Static file serving
app.use(express.static("public"));

module.exports = app;
