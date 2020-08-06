const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


app.listen(5000);