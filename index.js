/*
File name: index.js
Creator: Aditya Chouhan
Student ID: 301215583
Date : 16 October; 2022
*/

//Importing main server file
const app = require("./config/server");

//Port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT);
