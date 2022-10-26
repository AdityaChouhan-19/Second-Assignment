const express = require("express");
const router = express.Router();

//Connect to the contacts model
const Contact = require("../models/contacts");

module.exports.displayContactList = (req, res, next) => {
  Contact.find()
    .sort({ contactname: 1 })
    .exec((err, contactList) => {
      if (err) {
        return console.error(err);
      } else {
        res.render("contacts/contactlist", {
          title: "Contact List",
          ContactList: contactList,
        });
      }
    });
};

module.exports.displayUpdatePage = (req, res, next) => {
  let id = req.params.id;

  Contact.findById(id, (err, contactToUpdate) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("contacts/update", {
        title: "Update Contact",
        contact: contactToUpdate,
      });
    }
  });
};

module.exports.processUpdatePage = (req, res, next) => {
  let id = req.params.id;

  let updatedContact = Contact({
    _id: id,
    contactname: req.body.name,
    contactnumber: req.body.number,
    contactemail: req.body.email,
  });

  Contact.updateOne({ _id: id }, updatedContact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/contactlist");
    }
  });
};

module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  Contact.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/contactlist");
    }
  });
};
