const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

const mongoConnect = require("./util/database").mongoConnect;

// Passport Config
require("./config/passport")(passport);

// DB config
// const db = require('./config/keys').MongoURI;
const db =
  "mongodb+srv://TheRaihan:paperback@cluster0.iojlf.mongodb.net/PaperBack?retryWrites=true&w=majority";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(expressLayouts);
app.set("view engine", "ejs");

// Body Parser
app.use(express.urlencoded({ extended: false }));

// app.use
// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", require("./routes/index"));

app.use("/users", require("./routes/users"));
//app.use('/',require('./routes/dass'));

app.use((req, res, next) => {
  res.status(404).send("<h1>Error page</h1>");
});

mongoConnect(() => app.listen(5000));
