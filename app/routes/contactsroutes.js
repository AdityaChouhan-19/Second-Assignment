const express = require("express");
const router = express.Router();

const passport = require("passport");

//Importing contacts controller
const contactsRouter = require("../controllers/contactscontroller");

function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

router.get("/", contactsRouter.displayContactList);

router.get("/update/:id", requireAuth, contactsRouter.displayUpdatePage);

router.post("/update/:id", requireAuth, contactsRouter.processUpdatePage);

router.get("/delete/:id", requireAuth, contactsRouter.performDelete);

module.exports = router;
