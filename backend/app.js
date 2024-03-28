//mongodb+srv://antonioeasv:<password>@cluster0.iosnbsf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require ("body-parser");

//Cors handle, Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // If using .fetch and not axios
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

  //Database
  const uri = "mongodb+srv://antonioeasv:<password>@cluster0.iosnbsf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  mongoose.connect(uri, {

  })
  .then(() => {
    console.log("MongoDB connected!")
  })
  .catch(err => console.log(err))