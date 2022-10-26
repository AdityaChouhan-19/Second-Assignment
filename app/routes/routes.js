/*
File name: routes.js
Creator: Aditya Chouhan
Student ID: 301215583
Date : 16 October; 2022
*/

const express = require("express");
const router = express.Router();

//Import indexcontroller
const indexcontroller = require("../controllers/controllers");

router.get("/", indexcontroller.landingPage);

router.get("/homepage", indexcontroller.landingPage);

router.get("/services", indexcontroller.services);

router.get("/projects", indexcontroller.projects);

router.get("/about", indexcontroller.about);

router.get("/contact", indexcontroller.contact);

router.get("/login", indexcontroller.displayLoginPage);

router.post("/login", indexcontroller.processLoginPage);

router.get("/register", indexcontroller.displayRegisterPage);

router.post("/register", indexcontroller.processRegisterPage);

router.get("/logout", indexcontroller.performLogout);

//Export router
module.exports = router;
