const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");

const app = express();

// DB config
// const db = require('./config/keys').MongoURI;
const db = 'mongodb+srv://TheRaihan:paperback@cluster0.iojlf.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(db, { useNewUrlParser:true, useUnifiedTopology: true })
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));


app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body Parser
app.use(express.urlencoded({extended:false }));

// app.use 

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(5000);