const mongoose = require("mongoose");

//Contact model
const contactModel = mongoose.Schema(
  {
    contactname: String,
    contactnumber: String,
    contactemail: String,
  },
  {
    collection: "contacts",
  }
);

module.exports = mongoose.model("contact", contactModel);
