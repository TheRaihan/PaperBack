const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");

const app = express();

// DB config


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://TheRaihan:<password>@cluster0.iojlf.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


app.listen(5000);